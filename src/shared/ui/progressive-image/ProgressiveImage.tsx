'use client'

import React, { useEffect, useState } from 'react'

type ProgressiveImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  loading?: 'lazy' | 'eager'
  objectFit?: 'contain' | 'cover'
  lockAspect?: boolean
  'aria-hidden'?: boolean | 'true' | 'false'
}

export default function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  priority = false,
  loading,
  objectFit = 'contain',
  lockAspect = true,
  ...rest
}: ProgressiveImageProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    setReady(false)

    const source = new window.Image()
    source.decoding = 'async'
    if (priority) {
      source.fetchPriority = 'high'
    }
    source.src = src

    const reveal = async () => {
      try {
        await source.decode()
      } catch {
        if (!source.complete) {
          await new Promise<void>((resolve, reject) => {
            source.onload = () => resolve()
            source.onerror = () => reject(new Error('image load failed'))
          })
        }
      }

      if (!cancelled) {
        setReady(true)
      }
    }

    void reveal().catch(() => {
      if (!cancelled) {
        setReady(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [src, priority])

  const rootClass = [
    'progressive-image',
    lockAspect ? '' : 'progressive-image--auto',
    ready ? 'progressive-image--ready' : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={rootClass}
      style={
        {
          ...style,
          ...(lockAspect ? { aspectRatio: `${width} / ${height}` } : null),
          '--progressive-fit': objectFit
        } as React.CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="progressive-image__img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : (loading ?? 'lazy')}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        {...rest}
      />
    </span>
  )
}
