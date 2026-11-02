import React, { useEffect, useRef } from 'react'

const NoiseAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return
    }

    const isNarrow = window.matchMedia('(max-width: 767px)').matches
    const patternSize = isNarrow ? 96 : 128
    const refreshMs = isNarrow ? 220 : 160
    const patternAlpha = 8

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true
    })
    if (!ctx) {
      return
    }

    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = patternSize
    patternCanvas.height = patternSize
    const patternCtx = patternCanvas.getContext('2d')
    if (!patternCtx) {
      return
    }

    const patternData = patternCtx.createImageData(patternSize, patternSize)
    const patternPixelDataLength = patternSize * patternSize * 4
    let timerId = 0
    let running = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1 : 1.25)
      canvas.width = Math.ceil(window.innerWidth * dpr)
      canvas.height = Math.ceil(window.innerHeight * dpr)
      draw()
    }

    const update = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 155 + 100
        patternData.data[i] = value
        patternData.data[i + 1] = value
        patternData.data[i + 2] = value
        patternData.data[i + 3] = patternAlpha
      }

      patternCtx.putImageData(patternData, 0, 0)
    }

    const draw = () => {
      const { width, height } = canvas
      if (!width || !height) {
        return
      }

      ctx.clearRect(0, 0, width, height)
      const pattern = ctx.createPattern(patternCanvas, 'repeat')
      if (!pattern) {
        return
      }
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, width, height)
    }

    const tick = () => {
      if (!running) {
        return
      }

      if (!document.hidden) {
        update()
        draw()
      }

      timerId = window.setTimeout(tick, refreshMs)
    }

    const onVisibility = () => {
      if (!document.hidden && running) {
        window.clearTimeout(timerId)
        tick()
      }
    }

    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    resize()
    tick()

    return () => {
      running = false
      window.clearTimeout(timerId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="grain" aria-hidden />
}

export default NoiseAnimation
