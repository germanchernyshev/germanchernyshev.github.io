import React from 'react'

type ButtonVariant =
  | 'primary'
  | 'ghost'
  | 'nested'
  | 'nestedPrimary'
  | 'nestedGhost'
type ButtonSize = 'sm' | 'md' | 'lg'

type SharedProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  elevated?: boolean
  block?: boolean
  className?: string
  children?: React.ReactNode
}

type ButtonAsButton = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined
  }

type ButtonAsLink = SharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'ui-button--primary',
  ghost: 'ui-button--ghost',
  nested: 'ui-button--nested',
  nestedPrimary: 'ui-button--nested-primary',
  nestedGhost: 'ui-button--nested-ghost',
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'ui-button--sm',
  md: 'ui-button--md',
  lg: 'ui-button--lg',
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    elevated = false,
    block = false,
    className = '',
    children,
    ...rest
  } = props

  const classes = [
    'ui-button',
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    elevated ? 'ui-button--elevated' : '',
    block ? 'ui-button--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href) {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a {...anchorProps} href={props.href} className={classes}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={buttonProps.type ?? 'button'} {...buttonProps} className={classes}>
      {children}
    </button>
  )
}
