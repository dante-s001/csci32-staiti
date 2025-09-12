import { Button } from '@repo/ui/button'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'

export default function ButtonPage() {
  return (
    <div className="p-24 flex flex-col gap-y-4">
      <div className="flex gap-2">
        <Button size={Size.SMALL} variant={Variant.PRIMARY} href="/">
          Primary Button
        </Button>
        <Button size={Size.MEDIUM} variant={Variant.PRIMARY}>
          Primary Button
        </Button>
        <Button size={Size.LARGE} variant={Variant.PRIMARY}>
          Primary Button
        </Button>
      </div>

      <div className="flex gap-2 ">
        <Button size={Size.SMALL} variant={Variant.SECONDARY}>
          Secondary Button
        </Button>
        <Button size={Size.MEDIUM} variant={Variant.SECONDARY}>
          Secondary Button
        </Button>
        <Button size={Size.LARGE} variant={Variant.SECONDARY}>
          Secondary Button
        </Button>
      </div>

      <div className="flex gap-2 ">
        <Button size={Size.SMALL} variant={Variant.TERTIARY}>
          Tertiary Button
        </Button>
        <Button size={Size.MEDIUM} variant={Variant.TERTIARY}>
          Tertiary Button
        </Button>
        <Button size={Size.LARGE} variant={Variant.TERTIARY}>
          Tertiary Button
        </Button>
      </div>
    </div>
  )
}
