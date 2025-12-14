'use client'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { GuessingGameMenuProps } from './page'
import { FormEventHandler, useState } from 'react'

export default function RandomNumberGameMenu({ startGame }: GuessingGameMenuProps) {
  const [showSettings, setShowSettings] = useState(false)

  function onSubmitSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const min = Number(data.get('min'))
    const max = Number(data.get('max'))
    const maxGuesses = Number(data.get('maxGuessCount'))
    startGame({ min, max, maxGuesses })
    setShowSettings(false)
  }

  return (
    <div className="p-10 bg-blue-100 rounded-lg">
      <div className="flex flex-col gap-4">
        {showSettings ? (
          <div className="flex flex-col gap-4">
            <header>
              <h1 className="text-2xl font-bold">Please enter the starting values below.</h1>
            </header>
            <br />

            <form className="flex flex-col gap-4" onSubmit={onSubmitSettings}>
              <h2 className="text-2xl font-bold">Minumum number value:</h2>
              <Input defaultValue={1} type="number" placeholder="Minimum guessing value" name="min" id="min" />
              <h2 className="text-2xl font-bold">Maximum number value:</h2>
              <Input defaultValue={10} type="number" placeholder="Maximum guessing value" name="max" id="max" />
              <h2 className="text-2xl font-bold">Number of allowed guesses:</h2>
              <Input
                defaultValue={3}
                type="number"
                placeholder={'Alloted guesses'}
                name="maxGuessCount"
                id="maxGuessCount"
              />
              <Button>Submit</Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <header>
              <h1 className="text-2xl font-bold">Welcome to the Random Number Guesser Game!</h1>
              <p className="text-lg">Ready to play?</p>
            </header>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setShowSettings(true)
              }}
            >
              <Button>Start</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
