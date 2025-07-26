import React from 'react'
import { Guess } from '../types'

interface EndScreenProps {
  guesses: Guess[]
  onRestart: () => void
}

const EndScreen: React.FC<EndScreenProps> = ({ guesses, onRestart }) => {
  const attempts = guesses.length

  return (
    <div className="end-screen">
      <h2>Game Over</h2>
      <p>
        Congratulations! You found the number in {attempts} {attempts === 1 ? 'guess' : 'guesses'}.
      </p>
      <div className="guess-history">
        <h3>Guess Details</h3>
        <ul>
          {guesses.map((item, index) => (
            <li key={index}>
              Guess {index + 1}: {item.guess} - {item.feedback}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onRestart}>Play Again</button>
    </div>
  )
}

export default EndScreen