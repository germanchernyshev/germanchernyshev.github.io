'use client'

import { useEffect } from 'react'
import { publicAsset } from '@/shared/lib'

export default function CastleBackdrop() {
  useEffect(() => {
    let objectUrl = ''
    let cancelled = false

    const image = new window.Image()
    image.decoding = 'async'
    image.src = publicAsset('/img/castle.webp')

    const bake = async () => {
      try {
        await image.decode()
      } catch {
        if (!image.complete) {
          return
        }
      }

      if (cancelled) {
        return
      }

      const maxWidth = 960
      const scale = Math.min(1, maxWidth / Math.max(1, image.naturalWidth))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }

      ctx.filter = 'brightness(0.45) contrast(0.9) blur(3px)'
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(result => {
          if (result) {
            resolve(result)
            return
          }
          canvas.toBlob(resolve, 'image/jpeg', 0.82)
        }, 'image/webp', 0.8)
      })

      if (!blob || cancelled) {
        return
      }

      objectUrl = URL.createObjectURL(blob)
      document.documentElement.style.setProperty(
        '--castle-backdrop',
        `url("${objectUrl}")`
      )
      document.documentElement.classList.add('castle-backdrop-ready')
    }

    void bake()

    return () => {
      cancelled = true
      document.documentElement.classList.remove('castle-backdrop-ready')
      document.documentElement.style.removeProperty('--castle-backdrop')
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [])

  return null
}
