import React from 'react'
import useGauntletGame from './hooks/useGauntletGame'
import ChallengerSetup from './components/ChallengerSetup'
import GuessInput from './components/GuessInput'
import GuessHistory from './components/GuessHistory'
import Feedback from './components/Feedback'
import EndScreen from './components/EndScreen'

const App: React.FC = () => {
  const {
    gamePhase,
    guesses,
    feedback,
    setSecretNumber,
    makeGuess,
    restartGame
  } = useGauntletGame()

  return (
    <div className="app-container">
      {gamePhase === 'setup' && <ChallengerSetup onSubmit={setSecretNumber} />}
      {gamePhase === 'playing' && (
        <>
          <GuessInput onGuess={makeGuess} />
          <Feedback feedback={feedback} />
          <GuessHistory guesses={guesses} />
        </>
      )}
      {gamePhase === 'end' && (
        <EndScreen guesses={guesses} onRestart={restartGame} />
      )}
    </div>
  )
}

export default App