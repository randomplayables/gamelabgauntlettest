import React, { useState } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '../constants'

interface ChallengerSetupProps {
  onSubmit: (secret: number) => void
}

const ChallengerSetup: React.FC<ChallengerSetupProps> = ({ onSubmit }) => {
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
    onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} className="challenger-setup">
      <label htmlFor="secret-number">
        Choose a secret number ({MIN_NUMBER}-{MAX_NUMBER}):
      </label>
      <input
        id="secret-number"
        type="number"
        value={inputValue}
        onChange={handleChange}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Start Game</button>
    </form>
  )
}

export default ChallengerSetup