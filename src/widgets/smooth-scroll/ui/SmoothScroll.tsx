'use client'

import React, { useMemo } from 'react'
import { ReactLenis } from 'lenis/react'
import type { LenisOptions } from 'lenis'
import 'lenis/dist/lenis.css'

function headerOffset(): number {
  if (typeof window === 'undefined') {
    return -88
  }

  const padding = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop
  )

  return Number.isFinite(padding) && padding > 0 ? -padding : -88
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const options = useMemo<LenisOptions>(
    () => ({
      autoRaf: true,
      lerp: 0.12,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      syncTouch: false,
      anchors: {
        offset: headerOffset(),
      },
      prevent: (node) => Boolean(node.closest('.nav')),
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
    }),
    []
  )

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
