import { useState, useEffect } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'
import { Guess } from '../types'

type GamePhase = 'setup' | 'playing' | 'end'

export default function useGauntletGame() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup')
  const [secretNumber, setSecretNumberState] = useState<number | null>(null)
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [feedback, setFeedback] = useState<string>('')
  const [roundNumber, setRoundNumber] = useState<number>(1)
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    async function initializeSession() {
      const sessionData = await initGameSession()
      setSessionId(sessionData.sessionId)
    }
    initializeSession()
  }, [])

  function setSecretNumber(secret: number) {
    setSecretNumberState(secret)
    setGamePhase('playing')
    setGuesses([])
    setFeedback('')
  }

  function makeGuess(guess: number) {
    if (secretNumber === null) return
    let resultFeedback: string
    if (guess < secretNumber) {
      resultFeedback = 'Too low'
    } else if (guess > secretNumber) {
      resultFeedback = 'Too high'
    } else {
      resultFeedback = 'Correct'
    }
    const newGuess = { guess, feedback: resultFeedback }
    const updatedGuesses = [...guesses, newGuess]
    setGuesses(updatedGuesses)
    setFeedback(resultFeedback)
    if (resultFeedback === 'Correct') {
      setGamePhase('end')
      if (sessionId) {
        saveGameData(sessionId, roundNumber, {
          secretNumber,
          guesses: updatedGuesses
        })
      }
    }
  }

  function restartGame() {
    setSecretNumberState(null)
    setGamePhase('setup')
    setGuesses([])
    setFeedback('')
    setRoundNumber(prev => prev + 1)
  }

  return {
    gamePhase,
    guesses,
    feedback,
    setSecretNumber,
    makeGuess,
    restartGame
  }
}