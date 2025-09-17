'use client'

import { ReactNode } from 'react'
import { getSizeStyles, Size } from './size'
import { getCommonStyles } from './commonStyles'
import { getVariantBackgroundStyles, getVariantOutlineStyles, Variant } from './variant'

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
  const sizeCssClasses = getSizeStyles(size)
  const variantBackgroundCssClasses = getVariantBackgroundStyles(variant)
  const variantOutlineCssClasses = getVariantOutlineStyles(variant)
  const commonCssClasses = getCommonStyles()
  const completedCssClasses = `${sizeCssClasses} ${variantBackgroundCssClasses} ${variantOutlineCssClasses} ${commonCssClasses} ${className}`

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
