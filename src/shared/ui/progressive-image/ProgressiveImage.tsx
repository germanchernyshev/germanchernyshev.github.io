'use client'

import React, { useState } from 'react'
import Image from 'next/image'

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
  sizes?: string
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
  sizes,
  ...rest
}: ProgressiveImageProps) {
  const [ready, setReady] = useState(false)

  const rootClass = [
    'progressive-image',
    lockAspect ? '' : 'progressive-image--auto',
    ready ? 'progressive-image--ready' : '',
    className,
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
          '--progressive-fit': objectFit,
        } as React.CSSProperties
      }
    >
      <Image
        className="progressive-image__img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : (loading ?? 'lazy')}
        sizes={sizes ?? `${width}px`}
        draggable={false}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        {...rest}
      />
    </span>
  )
}
