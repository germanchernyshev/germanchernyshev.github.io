import React, { useEffect, useRef, useState } from 'react'

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function FollowCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const posX = useRef(0)
  const posY = useRef(0)
  const rafId = useRef<number | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (isTouchDevice() || prefersReducedMotion) {
      return
    }

    setEnabled(true)

    const stop = () => {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }

    const tick = () => {
      posX.current += (targetX.current - posX.current) * 0.18
      posY.current += (targetY.current - posY.current) * 0.18

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posX.current}px, ${posY.current}px, 0)`
      }

      const settled =
        Math.abs(targetX.current - posX.current) < 0.2 &&
        Math.abs(targetY.current - posY.current) < 0.2

      if (settled) {
        posX.current = targetX.current
        posY.current = targetY.current
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${posX.current}px, ${posY.current}px, 0)`
        }
        rafId.current = null
        return
      }

      rafId.current = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (rafId.current !== null) {
        return
      }
      rafId.current = window.requestAnimationFrame(tick)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX.current = event.clientX
      targetY.current = event.clientY
      start()
    }

    const { innerWidth, innerHeight } = window
    posX.current = innerWidth / 2
    posY.current = innerHeight / 2
    targetX.current = posX.current
    targetY.current = posY.current

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posX.current}px, ${posY.current}px, 0)`
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      stop()
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div ref={cursorRef} className="follow-cursor" aria-hidden>
      <div className="follow-cursor__ember" />
    </div>
  )
}
