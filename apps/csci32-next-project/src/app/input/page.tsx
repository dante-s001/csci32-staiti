'use client'
import Input from '@repo/ui/input'
import { Size } from '@repo/ui/size'
import { Variant } from '@repo/ui/variant'
import { Button } from '@repo/ui/button'
import { useState } from 'react'

export default function ButtonPage() {
  const [item1, setItem1] = useState('')
  const [item2, setItem2] = useState('')
  const [item3, setItem3] = useState('')

  return (
    <div className="p-24">
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <Input
            value={item1}
            setValue={setItem1}
            size={Size.MEDIUM}
            variant={Variant.PRIMARY}
            name="item 1"
            id="item 1"
          />
          <Button
            onClick={() => alert(`you entered: ${item1} in field 1`)}
            size={Size.MEDIUM}
            variant={Variant.PRIMARY}
          >
            Field 1
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={item2}
            setValue={setItem2}
            size={Size.MEDIUM}
            variant={Variant.PRIMARY}
            name="item 2"
            id="item 2"
          />
          <Button onClick={() => alert(`you entered: ${item2} in field 1`)} variant={Variant.SECONDARY}>
            Field 2
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={item3}
            setValue={setItem3}
            size={Size.MEDIUM}
            variant={Variant.TERTIARY}
            name="item 3"
            id="item 3"
          />
          <Button
            onClick={() => alert(`you entered: ${item3} in field 1`)}
            size={Size.LARGE}
            variant={Variant.TERTIARY}
          >
            Field 3
          </Button>
        </div>
      </div>
    </div>
  )
}
