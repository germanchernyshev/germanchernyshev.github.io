import React from 'react'

export type KitIconName =
  | 'bar-chart'
  | 'book'
  | 'bookmark'
  | 'bug'
  | 'cart'
  | 'castle'
  | 'chat'
  | 'checklist'
  | 'clipboard'
  | 'community'
  | 'diploma'
  | 'documents'
  | 'flask'
  | 'folder'
  | 'headset'
  | 'history'
  | 'key'
  | 'laptop'
  | 'mail'
  | 'pouch'
  | 'presentation'
  | 'rocket'
  | 'scroll-code'
  | 'send'
  | 'server'
  | 'shield'
  | 'sparkle'
  | 'sprout'
  | 'star'
  | 'target'
  | 'terminal'
  | 'trophy'
  | 'users'
  | 'wand'

type KitIconProps = {
  name: KitIconName
  size?: number
  className?: string
}

export const KIT_ICON_SM = 20
export const KIT_ICON_MD = 28
export const KIT_ICON_LG = 40

export default function KitIcon({
  name,
  size = KIT_ICON_MD,
  className,
}: KitIconProps) {
  const classes = ['kit-icon', className].filter(Boolean).join(' ')

  return (
    <svg
      className={classes}
      width={size}
      height={size}
      aria-hidden
      focusable="false"
    >
      <use href={`#kit-${name}`} />
    </svg>
  )
}
