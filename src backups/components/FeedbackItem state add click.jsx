import {useState} from 'react' 

function FeedbackItem() {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('This is an example of a feedback item')

  const addClick = () => {
    setRating((prev) => {
      return prev + 3
    })
  }

  const subtractClick = () => {
    setRating((prev) => {
      return prev - 3
    })
  }

  return (
    <div className="card">
      <div className="num-display">{rating}</div>
      <div className="text-display">{text}</div>
      <button onClick={addClick}>Click to add 3</button>
      <button onClick={subtractClick}>Click to minus 3</button>
    </div>
  )
}

export default FeedbackItem