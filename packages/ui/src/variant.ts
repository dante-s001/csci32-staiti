export enum Variant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export function getVariantBackgroundStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'bg-red-200 hover:bg-red-300 active:bg-red-500'
    case Variant.SECONDARY:
      return 'bg-green-300 hover:bg-green-400 active:bg-green-600'
    case Variant.TERTIARY:
      return 'bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-700'
  }
}

export function getVariantOutlineStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'outline-red-400'
    case Variant.SECONDARY:
      return 'outline-green-500'
    case Variant.TERTIARY:
      return 'outline-yellow-600'
  }
}

export function getVariantBorderStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'border-2 border-red-400'
    case Variant.SECONDARY:
      return 'border-2 border-green-500'
    case Variant.TERTIARY:
      return 'border-2 border-yellow-600'
  }
}

export function getVariantInputTextStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'text-grey'
    case Variant.SECONDARY:
      return 'text-grey'
    case Variant.TERTIARY:
      return 'text-grey'
  }
}
