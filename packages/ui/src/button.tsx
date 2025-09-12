'use client'

import { ReactNode } from 'react'
import { Size } from './size'
import { Variant } from './variant'

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  size?: Size
  variant?: Variant
}

export const Button = ({
  children,
  className,
  href,
  onClick,
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
}: ButtonProps) => {
  let sizeCssClasses = ''
  switch (size) {
    case Size.SMALL:
      sizeCssClasses = 'px-4 py-4 rounded shadow-sm'
      break
    case Size.MEDIUM:
      sizeCssClasses = 'px-6 py-4 rounded-md shadow-md'
      break
    case Size.LARGE:
      sizeCssClasses = 'px-8 py-4 rounded-lg shadow-lg'
      break
  }
  let variantCssClasses = ''
  switch (variant) {
    case Variant.PRIMARY:
      variantCssClasses = 'bg-red-200 outline-red-400 hover:bg-red-300 active:bg-red-500'
      break
    case Variant.SECONDARY:
      variantCssClasses = 'bg-green-300 outline-green-500 hover:bg-green-400 active:bg-green-600'
      break
    case Variant.TERTIARY:
      variantCssClasses = 'bg-yellow-400 outline-yellow-600 hover:bg-yellow-500 active:bg-yellow-700'
      break
  }

  const commonCssClasses = 'text-grey items-center justify-center focus:outline outline-offset-2 transition-colors'
  const completedCssClasses = `${sizeCssClasses} ${variantCssClasses} ${commonCssClasses} ${className}`

  return href ? (
    <a href={href} className={completedCssClasses} target="blank">
      {children}
    </a>
  ) : (
    <button className={completedCssClasses} onClick={onClick}>
      {children}
    </button>
  )
}
