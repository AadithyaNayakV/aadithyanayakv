import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

/**
 * High-Tech PCB Circuit Board Background with subtle, steady movement.
 * Speed is frame-rate independent (time-delta based) so it travels at the
 * exact same calm, elegant speed across all 60Hz, 120Hz, 144Hz, and 240Hz devices.
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

    let traces = []
    let pulses = []

    const generateTraces = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight

      traces = []
      pulses = []

      const gridSize = Math.max(90, Math.floor(width / 16))
      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1

      // Significantly reduced trace count for a clean, minimal look
      const traceCount = Math.min(14, Math.floor((width * height) / 90000))

      let seed = 42
      const random = () => {
        seed = (seed * 16807) % 2147483647
        return (seed - 1) / 2147483646
      }

      for (let i = 0; i < traceCount; i++) {
        const startX = Math.floor(random() * cols) * gridSize
        const startY = Math.floor(random() * rows) * gridSize

        const points = [{ x: startX, y: startY }]
        let currX = startX
        let currY = startY

        const segments = Math.floor(random() * 3) + 2 // 2 to 4 segments per trace

        for (let s = 0; s < segments; s++) {
          const dir = Math.floor(random() * 4)
          const dist = (Math.floor(random() * 2) + 1) * gridSize

          // 45-degree chamfer bend or 90-degree orthogonal bend
          const use45 = random() > 0.5
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

        // Calculate total length and segment lengths
        let totalLength = 0
        const segmentLengths = []
        for (let p = 0; p < points.length - 1; p++) {
          const dx = points[p + 1].x - points[p].x
          const dy = points[p + 1].y - points[p].y
          const len = Math.hypot(dx, dy)
          segmentLengths.push(len)
          totalLength += len
        }

        if (totalLength > 80) {
          const trace = {
            points,
            segmentLengths,
            totalLength,
          }
          traces.push(trace)

          // Only a single gentle pulse for select traces (~6 pulses total across whole screen)
          if (i % 2 === 0) {
            pulses.push({
              trace,
              progress: random(), // random starting position
              colorType: i % 4 === 0 ? 'cyan' : 'violet',
            })
          }
        }
      }
    }

    generateTraces()

    // Helper: calculate coordinates along segmented path
    const getPointAtProgress = (trace, progress) => {
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

    const isDark = theme !== 'light'
    const traceStroke = isDark ? 'rgba(139, 92, 246, 0.09)' : 'rgba(99, 102, 241, 0.07)'
    const viaColor = isDark ? 'rgba(34, 211, 238, 0.28)' : 'rgba(6, 182, 212, 0.28)'
    const cyanColor = isDark ? '#22d3ee' : '#0891b2'
    const violetColor = isDark ? '#a855f7' : '#7c3aed'

    // Static speed: 1 full circuit traversal takes ~16 seconds on EVERY device (60Hz, 120Hz, 144Hz, 240Hz)
    const SPEED_PER_SECOND = 0.055

    let lastTime = performance.now()

    const render = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05)
      lastTime = currentTime

      ctx.clearRect(0, 0, width, height)

      // 1. Draw static traces and vias
      ctx.lineWidth = 1.2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let t = 0; t < traces.length; t++) {
        const trace = traces[t]
        const pts = trace.points
        if (pts.length < 2) continue

        ctx.strokeStyle = traceStroke
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let p = 1; p < pts.length; p++) {
          ctx.lineTo(pts[p].x, pts[p].y)
        }
        ctx.stroke()

        // Solder pad vias at endpoints
        ctx.fillStyle = viaColor
        ctx.beginPath()
        ctx.arc(pts[0].x, pts[0].y, 2.2, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(pts[pts.length - 1].x, pts[pts.length - 1].y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Draw subtle, slow-moving pulses (speed strictly fixed by elapsed seconds)
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i]
        pulse.progress = (pulse.progress + dt * SPEED_PER_SECOND) % 1

        const headPos = getPointAtProgress(pulse.trace, pulse.progress)
        const tailProgress = Math.max(0, pulse.progress - 0.04)
        const tailPos = getPointAtProgress(pulse.trace, tailProgress)

        const color = pulse.colorType === 'cyan' ? cyanColor : violetColor

        // Soft, calm pulse head
        ctx.save()
        ctx.shadowBlur = isDark ? 6 : 4
        ctx.shadowColor = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(headPos.x, headPos.y, 2.0, 0, Math.PI * 2)
        ctx.fill()

        // Subtle soft trail
        ctx.lineWidth = 1.2
        ctx.strokeStyle = color
        ctx.globalAlpha = 0.35
        ctx.beginPath()
        ctx.moveTo(tailPos.x, tailPos.y)
        ctx.lineTo(headPos.x, headPos.y)
        ctx.stroke()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    const handleResize = () => {
      generateTraces()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70 transition-opacity duration-500"
    />
  )
}
