import { HTMLInputTypeAttribute } from 'react'
import { getInputSizeStyles, Size } from './size'
import { getCommonStyles } from './commonStyles'
import { getVariantInputTextStyles, getVariantBorderStyles, getVariantOutlineStyles, Variant } from './variant'

interface InputProps {
  variant?: Variant
  size?: Size
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: any
  setValue?: (newValue: any) => void
  defaultValue?: any
  name: string
  id: string
}

export default function Input({
  variant = Variant.PRIMARY,
  size = Size.MEDIUM,
  value,
  name,
  id,
  defaultValue,
  setValue,
  type = 'text',
  placeholder,
}: InputProps) {
  const sizeCssClasses = getInputSizeStyles(size)
  const variantOutlineCssClasses = getVariantOutlineStyles(variant)
  const variantBorderCssClasses = getVariantBorderStyles(variant)
  const getVariantInputTextStyless = getVariantInputTextStyles(variant)
  const commonCssClasses = getCommonStyles()

  return (
    <input
      className={`${sizeCssClasses} ${variantOutlineCssClasses} ${variantBorderCssClasses} ${getVariantInputTextStyless} ${commonCssClasses}`}
      name={name}
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={setValue ? (newValue) => setValue(newValue.currentTarget.value) : () => {}}
    />
  )
}
