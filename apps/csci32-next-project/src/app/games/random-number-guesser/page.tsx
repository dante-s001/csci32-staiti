'use client'

import { useState } from 'react'
import RandomNumberGame from './random-number-game'
import RandomNumberGameMenu from './random-number-game-menu'
import { getRandomInt } from '@repo/math'

export interface StartGameProps {
  min: number
  max: number
  maxGuesses: number
}

export interface GuessingGameMenuProps {
  startGame: (props: StartGameProps) => void
}

export interface GuessingGameEngineProps {
  randomNumber: number
  maxGuessCount: number
  endGame: () => void
}

export default function RandomNumberGuesser() {
  const [isInProgress, setIsInProgress] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)
  const [maxGuessCount, setMaxGuessCount] = useState(0)

  function startGame({ min, max, maxGuesses }: StartGameProps) {
    const newRandomNumber = getRandomInt({ min, max })
    setRandomNumber(newRandomNumber)
    setMaxGuessCount(maxGuesses)
    setIsInProgress(true)
  }

  function endGame() {
    setIsInProgress(false)
  }

  return (
    <div className="p-24 max-w-[800px] m-auto">
      {isInProgress ? (
        <RandomNumberGame endGame={endGame} randomNumber={randomNumber} maxGuessCount={maxGuessCount} />
      ) : (
        <RandomNumberGameMenu startGame={startGame} />
      )}
    </div>
  )
}
