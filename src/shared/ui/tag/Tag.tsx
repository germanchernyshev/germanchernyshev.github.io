import React from 'react'

export default function Tag({
  as: TagName = 'span',
  className = '',
  children,
  ...rest
}: {
  as?: 'span' | 'li'
  className?: string
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  const classes = ['ui-tag', className].filter(Boolean).join(' ')

  return (
    <TagName className={classes} {...rest}>
      {children}
    </TagName>
  )
}

export function TagList({
  className = '',
  children,
  ...rest
}: {
  className?: string
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLUListElement>) {
  const classes = ['ui-tag-list', className].filter(Boolean).join(' ')

  return (
    <ul className={classes} {...rest}>
      {children}
    </ul>
  )
}
