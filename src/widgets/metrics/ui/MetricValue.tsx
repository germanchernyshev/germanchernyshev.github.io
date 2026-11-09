'use client'

import React, { useEffect, useRef } from 'react'

type ParsedMetric =
  | {
      kind: 'range'
      from: number
      to: number
      joiner: string
      suffix: string
    }
  | {
      kind: 'single'
      to: number
      prefix: string
      suffix: string
    }
  | {
      kind: 'static'
      text: string
    }

function parseMetricValue(value: string): ParsedMetric {
  const rangeMatch = value.match(/^(\d+)\s*[–-]\s*(\d+)(\+?)(%?)$/)
  if (rangeMatch) {
    return {
      kind: 'range',
      from: Number(rangeMatch[1]),
      to: Number(rangeMatch[2]),
      joiner: '–',
      suffix: `${rangeMatch[3]}${rangeMatch[4]}`,
    }
  }

  const singleMatch = value.match(/^([−-])?(\d+)(\+?)(%?)$/)
  if (singleMatch) {
    return {
      kind: 'single',
      to: Number(singleMatch[2]),
      prefix: singleMatch[1] === '-' ? '−' : singleMatch[1] ?? '',
      suffix: `${singleMatch[3]}${singleMatch[4]}`,
    }
  }

  return { kind: 'static', text: value }
}

function formatMetric(parsed: ParsedMetric, progress: number): string {
  if (parsed.kind === 'static') {
    return parsed.text
  }

  if (parsed.kind === 'range') {
    const current = Math.round(
      parsed.from + (parsed.to - parsed.from) * progress
    )
    return `${parsed.from}${parsed.joiner}${current}${parsed.suffix}`
  }

  const current = Math.round(parsed.to * progress)
  return `${parsed.prefix}${current}${parsed.suffix}`
}

export default function MetricValue({ value }: { value: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const parsed = parseMetricValue(value)
    if (parsed.kind === 'static') {
      root.textContent = value
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      root.textContent = value
      return
    }

    root.textContent = formatMetric(parsed, 0)

    let frameId = 0
    let glowTimer = 0
    let hasStarted = false

    const play = () => {
      if (hasStarted) {
        return
      }
      hasStarted = true

      const durationMs = 1100
      const startedAt = performance.now()

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / durationMs)
        const eased = 1 - (1 - progress) ** 3
        root.textContent = formatMetric(parsed, eased)

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick)
          return
        }

        root.textContent = value
        root.classList.add('metrics__value--done')
        glowTimer = window.setTimeout(() => {
          root.classList.remove('metrics__value--done')
        }, 520)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(root)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(glowTimer)
      root.classList.remove('metrics__value--done')
    }
  }, [value])

  return <div ref={rootRef} className="metrics__value" />
}
