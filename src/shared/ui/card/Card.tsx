import React from 'react'

type CardPadding = 'none' | 'pad' | 'padInner' | 'padStack'

export default function Card({
  as: Tag = 'div',
  padding = 'pad',
  shadow = false,
  interactive = false,
  className = '',
  children,
  ...rest
}: {
  as?: 'div' | 'article' | 'aside' | 'li' | 'section'
  padding?: CardPadding
  shadow?: boolean
  interactive?: boolean
  className?: string
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  const paddingClass =
    padding === 'pad'
      ? 'ui-card--pad'
      : padding === 'padInner'
        ? 'ui-card--pad-inner'
        : padding === 'padStack'
          ? 'ui-card--pad-stack'
          : ''

  const classes = [
    'ui-card',
    paddingClass,
    shadow ? 'ui-card--shadow' : '',
    interactive ? 'ui-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
