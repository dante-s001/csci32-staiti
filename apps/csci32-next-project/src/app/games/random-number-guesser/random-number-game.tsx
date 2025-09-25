'use client'

import { useState } from 'react'
import { GuessingGameEngineProps } from './page'
import { Button } from '@repo/ui/button'
import Input from '@repo/ui/input'

export default function RandomNumberGame({ randomNumber, endGame, maxGuessCount }: GuessingGameEngineProps) {
  const [guessCount, setGuessCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [guess, setGuess] = useState(0)
  const [hasWon, setGameOver] = useState(false)

  function submitGuess(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newGuessCount = guessCount + 1
    if (guess < randomNumber) {
      if (guess < randomNumber * 0.8) {
        //if the guess is more than 20% lower than the correct answer, tells them they are guessing way too low
        setFeedback('Way too low!')
      } else {
        //otherwise just says too low
        setFeedback('Too low!')
      }
    } else if (guess > randomNumber) {
      //if the guess is more than 20% higher than the correct answer, tells them they are guessing way too high
      if (guess > randomNumber * 1.2) {
        setFeedback('Way too high!')
      }
      //otherwise just says too high
      else {
        setFeedback('Too high!')
      }
    } else if (guess === randomNumber) {
      setFeedback('Corect! You win!')
      setGameOver(true)
    } else if (newGuessCount === maxGuessCount) {
      setFeedback(`Out of guesses! The correct number was ${randomNumber}.`)
      setGameOver(true)
    }
    setGuessCount(newGuessCount)
  }
  function onSubmitEndGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGuessCount(0)
    setFeedback('')
    setGuess(0)
    setGameOver(false)
    endGame()
  }

  return (
    <div
      className={`${maxGuessCount - 1 === guessCount ? 'bg-red-100' : ''}
      ${maxGuessCount === guessCount ? 'bg-red-250' : ''}
      ${hasWon ? 'bg-green-100' : ''}
      p-10 rounded-lg transition-color`}
    >
      {hasWon ? (
        <form className="flex flex-col gap-4" onSubmit={onSubmitEndGame}>
          <div>{feedback}</div>
          <Button>End Game</Button>
        </form>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={submitGuess}>
          <Input
            name="guess"
            id="guess"
            type="number"
            placeholder="Enter your guess"
            value={guess}
            setValue={(newValue) => setGuess(Number(newValue))}
          />
          <div>{feedback}</div>
          <div>You have guessed {guessCount} times so far.</div>
          <div>You have {maxGuessCount - guessCount} guesses remaining.</div>
          <Button>Continue</Button>
        </form>
      )}
    </div>
  )
}
