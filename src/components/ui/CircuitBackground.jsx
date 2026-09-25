import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Animated High-Tech PCB Circuit Board Background
 * Features realistic circuit board traces with 45°/90° bends, solder pad vias,
 * and high-speed data pulses traveling across motherboard pathways in real time.
 */
export default function CircuitBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      generateTraces()
    }
    window.addEventListener('resize', handleResize)

    // Generate circuit pathways
    let traces = []
    let pulses = []

    function generateTraces() {
      traces = []
      pulses = []

      const gridSize = Math.max(60, Math.floor(width / 22))
      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1

      const traceCount = Math.min(45, Math.floor((width * height) / 28000))

      for (let i = 0; i < traceCount; i++) {
        const startX = Math.floor(Math.random() * cols) * gridSize
        const startY = Math.floor(Math.random() * rows) * gridSize

        const points = [{ x: startX, y: startY }]
        let currX = startX
        let currY = startY

        const segments = Math.floor(Math.random() * 4) + 3 // 3 to 6 segments per trace

        for (let s = 0; s < segments; s++) {
          const dir = Math.floor(Math.random() * 4)
          const dist = (Math.floor(Math.random() * 3) + 1) * gridSize

          // 45-degree chamfer bend or 90-degree orthogonal bend
          const use45 = Math.random() > 0.4
          if (use45) {
            const diagDist = gridSize
            if (dir === 0) {
              currX += diagDist
              currY += diagDist
            } else if (dir === 1) {
              currX -= diagDist
              currY += diagDist
            } else if (dir === 2) {
              currX += diagDist
              currY -= diagDist
            } else {
              currX -= diagDist
              currY -= diagDist
            }
            points.push({ x: currX, y: currY })
          }

          // Orthogonal run
          if (dir === 0) currX += dist
          else if (dir === 1) currX -= dist
          else if (dir === 2) currY += dist
          else currY -= dist

          points.push({ x: currX, y: currY })
        }

        // Calculate total length
        let totalLength = 0
        const segmentLengths = []
        for (let p = 0; p < points.length - 1; p++) {
          const dx = points[p + 1].x - points[p].x
          const dy = points[p + 1].y - points[p].y
          const len = Math.sqrt(dx * dx + dy * dy)
          segmentLengths.push(len)
          totalLength += len
        }

        if (totalLength > 100) {
          const trace = {
            points,
            segmentLengths,
            totalLength,
            hasViaStart: Math.random() > 0.3,
            hasViaEnd: Math.random() > 0.3,
          }
          traces.push(trace)

          // 1 to 2 light pulses per trace
          const pulseCount = Math.random() > 0.5 ? 2 : 1
          for (let k = 0; k < pulseCount; k++) {
            pulses.push({
              trace,
              progress: Math.random(),
              speed: 0.0012 + Math.random() * 0.002, // variable pulse speed
              size: 2.2 + Math.random() * 1.5,
              colorType: Math.random() > 0.5 ? 'cyan' : 'violet',
            })
          }
        }
      }
    }

    generateTraces()

    // Helper: get coordinate along a multi-segment line given 0..1 progress
    function getPointAtProgress(trace, progress) {
      const targetDist = progress * trace.totalLength
      let accumulated = 0

      for (let i = 0; i < trace.segmentLengths.length; i++) {
        const segLen = trace.segmentLengths[i]
        if (accumulated + segLen >= targetDist || i === trace.segmentLengths.length - 1) {
          const segProgress = segLen > 0 ? (targetDist - accumulated) / segLen : 0
          const p1 = trace.points[i]
          const p2 = trace.points[i + 1]
          return {
            x: p1.x + (p2.x - p1.x) * segProgress,
            y: p1.y + (p2.y - p1.y) * segProgress,
          }
        }
        accumulated += segLen
      }
      return trace.points[0]
    }

    let mouseX = -1000
    let mouseY = -1000
    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const isDark = theme !== 'light'
      const traceBaseAlpha = isDark ? 0.14 : 0.09
      const traceStroke = isDark ? 'rgba(139, 92, 246, ' : 'rgba(99, 102, 241, '
      const viaColor = isDark ? 'rgba(34, 211, 238, 0.35)' : 'rgba(6, 182, 212, 0.35)'
      const cyanGlow = isDark ? '#22d3ee' : '#0891b2'
      const violetGlow = isDark ? '#a855f7' : '#7c3aed'

      // 1. Draw motherboard circuit traces
      ctx.lineWidth = 1.2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let t = 0; t < traces.length; t++) {
        const trace = traces[t]
        const pts = trace.points
        if (pts.length < 2) continue

        // Check proximity to mouse for interactive trace glow
        let extraAlpha = 0
        const firstPt = pts[0]
        const distToMouse = Math.hypot(firstPt.x - mouseX, firstPt.y - mouseY)
        if (distToMouse < 260) {
          extraAlpha = (1 - distToMouse / 260) * 0.22
        }

        ctx.strokeStyle = `${traceStroke}${traceBaseAlpha + extraAlpha})`
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let p = 1; p < pts.length; p++) {
          ctx.lineTo(pts[p].x, pts[p].y)
        }
        ctx.stroke()

        // Solder pad vias
        if (trace.hasViaStart) {
          ctx.fillStyle = viaColor
          ctx.beginPath()
          ctx.arc(pts[0].x, pts[0].y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
        if (trace.hasViaEnd) {
          ctx.fillStyle = viaColor
          ctx.beginPath()
          ctx.arc(pts[pts.length - 1].x, pts[pts.length - 1].y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 2. Draw Traveling Light Pulses (data packets)
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i]
        pulse.progress += pulse.speed
        if (pulse.progress > 1) {
          pulse.progress = 0
        }

        const headPos = getPointAtProgress(pulse.trace, pulse.progress)
        const tailProgress = Math.max(0, pulse.progress - 0.05)
        const tailPos = getPointAtProgress(pulse.trace, tailProgress)

        const color = pulse.colorType === 'cyan' ? cyanGlow : violetGlow

        // Glowing pulse head
        ctx.save()
        ctx.shadowBlur = isDark ? 10 : 6
        ctx.shadowColor = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(headPos.x, headPos.y, pulse.size, 0, Math.PI * 2)
        ctx.fill()

        // Faint trailing beam
        ctx.lineWidth = pulse.size * 0.8
        ctx.strokeStyle = color
        ctx.globalAlpha = 0.4
        ctx.beginPath()
        ctx.moveTo(tailPos.x, tailPos.y)
        ctx.lineTo(headPos.x, headPos.y)
        ctx.stroke()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-80 transition-opacity duration-700"
    />
  )
}
