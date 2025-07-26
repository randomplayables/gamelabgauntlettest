import React from 'react'

interface FeedbackProps {
  feedback: string
}

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  if (!feedback) return null

  return (
    <div className="feedback">
      <h2>Feedback</h2>
      <p>{feedback}</p>
    </div>
  )
}

export default Feedback