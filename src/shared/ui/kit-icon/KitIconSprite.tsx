'use client'

import { useEffect } from 'react'
import { publicAsset } from '@/shared/lib'

const HOST_ID = 'kit-icon-sprite-host'

export default function KitIconSprite() {
  useEffect(() => {
    if (document.getElementById(HOST_ID)) {
      return
    }

    const host = document.createElement('div')
    host.id = HOST_ID
    host.setAttribute('aria-hidden', 'true')
    host.style.cssText =
      'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none'
    document.body.prepend(host)

    let cancelled = false

    void fetch(publicAsset('/icons-kit/sprite.svg'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`sprite ${response.status}`)
        }
        return response.text()
      })
      .then((markup) => {
        if (cancelled) {
          return
        }
        host.innerHTML = markup.replace(/<\?xml[^>]*\?>/i, '').trim()
      })
      .catch((error) => {
        console.error('KitIcon sprite failed to load', error)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
