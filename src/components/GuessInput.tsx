import React, { useState } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '../constants'

interface GuessInputProps {
  onGuess: (guess: number) => void
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = parseInt(inputValue, 10)
    if (isNaN(value) || value < MIN_NUMBER || value > MAX_NUMBER) {
      setError(`Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`)
      return
    }
    onGuess(value)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="guess-input">
      <label htmlFor="guess-input">
        Enter your guess ({MIN_NUMBER}-{MAX_NUMBER}):
      </label>
      <input
        id="guess-input"
        type="number"
        value={inputValue}
        onChange={handleChange}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Guess</button>
    </form>
  )
}

export default GuessInput