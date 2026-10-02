import { Float, Html, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { ArrowLeft, Brain, Database, Layout, Sparkles, Terminal, Wrench } from 'lucide-react'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import { skillCategories } from '../../data/skills'
import { TechIcon } from '../ui/TechIcons'

const DOMAIN_ICONS = {
  languages: Terminal,
  frontend: Layout,
  'backend-ai': Brain,
  databases: Database,
  tools: Wrench,
}

// 5 Balanced Overview positions for the 5 resume categories
const OVERVIEW_POSITIONS = {
  'backend-ai': [0, 1.45, -0.2],
  frontend: [-2.15, 0.55, 0.2],
  tools: [2.15, 0.55, 0.2],
  languages: [-1.75, -1.15, -0.2],
  databases: [1.75, -1.15, -0.2],
}

/**
 * Calculates spaced concentric 3D positions for child skill nodes
 * Spread out cleanly so they never collide or crowd.
 */
function getChildNodePositions(skills) {
  const count = skills.length

  if (count <= 6) {
    // Single ring for up to 6 skills (spacious radius)
    const radius = 1.95
    return skills.map((skill, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * (radius * 0.76)
      const z = Math.sin(angle * 2) * 0.15
      return { ...skill, pos: [x, y, z] }
    })
  }

  // Dual concentric rings for 7+ skills (Backend & AI = 9, Tools & Platforms = 8)
  const innerCount = Math.floor(count * 0.42)
  const outerCount = count - innerCount
  const innerRadius = 1.50
  const outerRadius = 2.50

  return skills.map((skill, i) => {
    if (i < innerCount) {
      const angle = (i / innerCount) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(angle) * innerRadius
      const y = Math.sin(angle) * (innerRadius * 0.74)
      const z = Math.sin(angle * 2) * 0.18
      return { ...skill, pos: [x, y, z], isOuter: false }
    } else {
      const outerIndex = i - innerCount
      const angle = (outerIndex / outerCount) * Math.PI * 2 - Math.PI / 2 + 0.28
      const x = Math.cos(angle) * outerRadius
      const y = Math.sin(angle) * (outerRadius * 0.74)
      const z = Math.cos(angle * 2) * 0.18
      return { ...skill, pos: [x, y, z], isOuter: true }
    }
  })
}

/**
 * Central Glowing Crystal Nucleus with gyroscopic orbital rings
 */
function CentralNucleus({ activeColor, isDark, mode }) {
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    if (coreRef.current) {
      coreRef.current.rotation.y += dt * 0.4
      coreRef.current.rotation.x += dt * 0.22
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += dt * 0.55
      ring1Ref.current.rotation.x += dt * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= dt * 0.45
      ring2Ref.current.rotation.z -= dt * 0.2
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += dt * 0.3
      ring3Ref.current.rotation.y += dt * 0.25
    }
  })

  const coreScale = mode === 'cluster' ? 0.55 : 0.82

  return (
    <group scale={[coreScale, coreScale, coreScale]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial
          color={isDark ? '#141026' : '#f8fafc'}
          emissive={activeColor}
          emissiveIntensity={isDark ? 0.5 : 0.3}
          roughness={0.2}
          metalness={0.85}
          wireframe
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.42, 22, 22]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={isDark ? 0.85 : 0.65}
        />
      </mesh>

      {/* Gyroscopic Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.14, 0.012, 12, 48]} />
        <meshBasicMaterial color={activeColor} transparent opacity={isDark ? 0.75 : 0.5} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.32, 0.01, 12, 48]} />
        <meshBasicMaterial color={isDark ? '#22d3ee' : '#0284c7'} transparent opacity={isDark ? 0.6 : 0.4} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[1.48, 0.008, 12, 48]} />
        <meshBasicMaterial color={isDark ? '#a855f7' : '#7c3aed'} transparent opacity={isDark ? 0.5 : 0.35} />
      </mesh>
    </group>
  )
}

/**
 * Single Child Skill Node blooming out from the parent node
 */
function BloomingSkillNode({ skill, parentColor, isDark, hoveredSkill, setHoveredSkill }) {
  const meshRef = useRef()
  const isHovered = hoveredSkill === skill.name

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...skill.pos),
    ])
  }, [skill.pos])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const dt = Math.min(delta, 0.05)
    meshRef.current.rotation.y += dt * 0.9
    meshRef.current.rotation.x += dt * 0.45

    const targetScale = isHovered ? 1.4 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), dt * 8)
  })

  return (
    <group position={skill.pos}>
      {/* Laser Energy Conduit from Center to Node */}
      <primitive
        object={
          new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: skill.color || parentColor,
              transparent: true,
              opacity: isHovered ? (isDark ? 0.85 : 0.6) : (isDark ? 0.3 : 0.18),
            })
          )
        }
        position={[-skill.pos[0], -skill.pos[1], -skill.pos[2]]}
      />

      {/* 3D Crystal Octahedron */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredSkill(skill.name)
        }}
        onPointerOut={() => setHoveredSkill(null)}
        cursor="pointer"
      >
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color={skill.color || parentColor}
          emissive={skill.color || parentColor}
          emissiveIntensity={isHovered ? 1.2 : (isDark ? 0.6 : 0.35)}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Floating 3D HTML Badge with Brand Icon & Name (Clean, NO extra text!) */}
      <Html
        distanceFactor={6.2}
        center
        position={[0, 0.28, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          onMouseEnter={() => setHoveredSkill(skill.name)}
          onMouseLeave={() => setHoveredSkill(null)}
          className={`pointer-events-auto cursor-pointer select-none transition-all duration-200 flex items-center gap-2 px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-md whitespace-nowrap ${
            isHovered
              ? 'scale-110 shadow-xl z-30'
              : 'scale-95 opacity-90 hover:opacity-100 hover:scale-100 z-10'
          }`}
          style={{
            backgroundColor: isDark ? 'rgba(15, 13, 29, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isHovered ? (skill.color || parentColor) : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'),
            color: isDark ? '#f8fafc' : '#0f172a',
            boxShadow: isHovered ? `0 0 16px -1px ${skill.color || parentColor}60` : 'none',
          }}
        >
          <div className="flex shrink-0 items-center justify-center size-4">
            <TechIcon name={skill.name} color={skill.color} className="size-3.5" />
          </div>

          <span className="text-[11px] font-semibold tracking-tight">{skill.name}</span>
        </div>
      </Html>
    </group>
  )
}

/**
 * Overview Domain Node in the 5-domain constellation
 */
function OverviewDomainNode({ category, onSelect, isDark }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const pos = OVERVIEW_POSITIONS[category.id] || [0, 0, 0]
  const Icon = DOMAIN_ICONS[category.id] || Sparkles

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const dt = Math.min(delta, 0.05)
    meshRef.current.rotation.y += dt * 0.7
    meshRef.current.rotation.x += dt * 0.35

    const targetScale = hovered ? 1.3 : 1.05
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), dt * 6)
  })

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...pos),
    ])
  }, [pos])

  return (
    <group position={pos}>
      {/* Laser line to center */}
      <primitive
        object={
          new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: category.themeColor,
              transparent: true,
              opacity: hovered ? (isDark ? 0.6 : 0.4) : (isDark ? 0.25 : 0.15),
            })
          )
        }
        position={[-pos[0], -pos[1], -pos[2]]}
      />

      {/* 3D Crystal Octahedron */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(category.id)
        }}
        cursor="pointer"
      >
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={category.themeColor}
          emissive={category.themeColor}
          emissiveIntensity={hovered ? 0.9 : (isDark ? 0.55 : 0.3)}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Floating 3D Label */}
      <Html distanceFactor={6.2} center position={[0, 0.46, 0]} style={{ pointerEvents: 'none' }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(category.id)
          }}
          className={`pointer-events-auto cursor-pointer select-none transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg whitespace-nowrap ${
            hovered
              ? 'scale-110 shadow-xl'
              : 'scale-95 opacity-90 hover:opacity-100 hover:scale-105'
          }`}
          style={{
            backgroundColor: isDark ? 'rgba(15, 13, 29, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: hovered ? category.themeColor : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'),
            color: isDark ? '#f8fafc' : '#0f172a',
            boxShadow: hovered ? `0 0 20px -2px ${category.themeColor}70` : 'none',
          }}
        >
          <div
            className="flex items-center justify-center size-4 rounded-full"
            style={{ backgroundColor: `${category.themeColor}30`, color: category.themeColor }}
          >
            <Icon className="size-2.5" />
          </div>

          <span className="text-xs font-semibold tracking-tight">{category.shortTitle || category.title}</span>

          <span
            className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
            style={{ backgroundColor: `${category.themeColor}20`, color: category.themeColor }}
          >
            {category.skills.length}
          </span>
        </button>
      </Html>
    </group>
  )
}

/**
 * 3D Scene View
 */
function SkillsScene({ selectedCluster, onSelectCluster, hoveredSkill, setHoveredSkill }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const activeCategory = useMemo(() => {
    return skillCategories.find((c) => c.id === selectedCluster)
  }, [selectedCluster])

  const childSkills = useMemo(() => {
    if (!activeCategory) return []
    return getChildNodePositions(activeCategory.skills)
  }, [activeCategory])

  const activeColor = activeCategory ? activeCategory.themeColor : '#8b5cf6'

  return (
    <>
      <ambientLight intensity={isDark ? 0.65 : 0.85} />
      <directionalLight position={[5, 6, 4]} intensity={isDark ? 1.2 : 1.5} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={isDark ? 14 : 7} color="#8b5cf6" />
      <pointLight position={[3, 3, 2]} intensity={isDark ? 12 : 6} color="#06b6d4" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.8}
        maxPolarAngle={Math.PI / 2 + 0.35}
        minPolarAngle={Math.PI / 2 - 0.35}
      />

      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
        {/* Central Nucleus always present */}
        <CentralNucleus
          activeColor={activeColor}
          isDark={isDark}
          mode={selectedCluster ? 'cluster' : 'overview'}
        />

        {/* VIEW 1: OVERVIEW MODE (5 Main Domain Hub Nodes from resume) */}
        {!selectedCluster &&
          skillCategories.map((cat) => (
            <OverviewDomainNode
              key={cat.id}
              category={cat}
              onSelect={onSelectCluster}
              isDark={isDark}
            />
          ))}

        {/* VIEW 2: CLUSTER MODE (Selected node in center, all its skills blooming around it!) */}
        {selectedCluster && (
          <group>
            {childSkills.map((skill) => (
              <BloomingSkillNode
                key={skill.name}
                skill={skill}
                parentColor={activeCategory.themeColor}
                isDark={isDark}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))}
          </group>
        )}
      </Float>
    </>
  )
}

export default function Skills3DModel() {
  const [selectedCluster, setSelectedCluster] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="relative w-full h-[520px] lg:h-[600px] rounded-2xl overflow-hidden border border-edge/70 bg-surface/50 backdrop-blur-md shadow-2xl transition-all duration-300">
      {/* Background Radial Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.08) 50%, transparent 80%)'
            : 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.05) 50%, transparent 80%)',
        }}
      />

      {/* Top HUD Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Back button when in cluster mode */}
        <div className="pointer-events-auto flex items-center gap-2">
          {selectedCluster && (
            <button
              type="button"
              onClick={() => setSelectedCluster(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-edge bg-surface/90 font-mono text-xs font-semibold text-ink hover:border-accent hover:text-accent shadow-md transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to All Categories</span>
            </button>
          )}
        </div>

        {/* Right: Quick Domain Selectors */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={() => setSelectedCluster(null)}
            className={`px-3 py-1 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
              selectedCluster === null
                ? 'border-accent bg-accent/20 text-accent font-semibold shadow-xs'
                : 'border-edge bg-surface/80 text-muted hover:text-ink'
            }`}
          >
            All 5 Hubs
          </button>

          {skillCategories.map((cat) => {
            const isActive = selectedCluster === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCluster(cat.id)}
                className={`px-3 py-1 rounded-lg border font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'border-accent bg-accent/20 text-accent font-semibold shadow-xs'
                    : 'border-edge bg-surface/80 text-muted hover:text-ink'
                }`}
              >
                <span className="size-1.5 rounded-full" style={{ backgroundColor: cat.themeColor }} />
                <span>{cat.shortTitle || cat.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <Suspense fallback={null}>
          <SkillsScene
            selectedCluster={selectedCluster}
            onSelectCluster={setSelectedCluster}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
