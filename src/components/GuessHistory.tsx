import React from 'react'
import { Guess } from '../types'

interface GuessHistoryProps {
  guesses: Guess[]
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ guesses }) => {
  if (guesses.length === 0) {
    return null
  }

  return (
    <div className="guess-history">
      <h2>Guess History</h2>
      <ul>
        {guesses.map((item, index) => (
          <li key={index}>
            Guess {index + 1}: {item.guess} - {item.feedback}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GuessHistory