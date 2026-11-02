import React, { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface DragonFirefliesProps {
  count?: number
}

const DragonFireflies: React.FC<DragonFirefliesProps> = ({ count = 5 }) => {
  const firefliesRef = useRef<Array<HTMLDivElement | null>>([])
  const [isEnabled, setIsEnabled] = useState(false)
  const flickerStyles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        '--flicker-duration': `${3.8 + Math.random() * 2.4}s`,
        '--flicker-delay': `${Math.random() * 3.2}s`,
      })),
    [count]
  )

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return
    }

    setIsEnabled(true)
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const tweens: gsap.core.Tween[] = []
    const nodes = firefliesRef.current.slice(0, count)

    nodes.forEach(firefly => {
      if (!firefly) {
        return
      }

      const container = firefly.parentNode as HTMLElement | null
      if (!container) {
        return
      }

      const containerRect = container.getBoundingClientRect()
      const initialX = Math.random() * containerRect.width
      const initialY = Math.random() * containerRect.height

      gsap.set(firefly, {
        x: initialX,
        y: initialY,
        force3D: true
      })

      const animateFirefly = () => {
        const tween = gsap.to(firefly, {
          x: '+=' + (Math.random() * 100 - 50),
          y: '+=' + (Math.random() * 100 - 50),
          duration: Math.random() * 2 + 1.4,
          ease: 'power1.inOut',
          force3D: true,
          onComplete: animateFirefly
        })
        tweens.push(tween)
      }

      animateFirefly()
    })

    const onVisibility = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause()
      } else {
        gsap.globalTimeline.resume()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      tweens.forEach(tween => tween.kill())
      gsap.killTweensOf(nodes.filter(Boolean))
    }
  }, [isEnabled, count])

  if (!isEnabled) {
    return null
  }

  return (
    <div className="fireflies-container" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <div
          ref={el => {
            firefliesRef.current[index] = el
          }}
          key={index}
          className="firefly shown"
          style={flickerStyles[index] as React.CSSProperties}
        />
      ))}
    </div>
  )
}

export default DragonFireflies
