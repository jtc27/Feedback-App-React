import Card from "./shared/card"
import Button from "./shared/button"
import {useState} from 'react'
import RatingSelect from "./RatingSelect"

import { useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"
import { useEffect } from "react"

function FeedbackForm() {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState()

  const {addFeedback} = useContext(FeedbackContext)
  const {feedbackEditState} = useContext(FeedbackContext)
  const {updateFeedbackItem} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEditState.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEditState.item.text)
      setRating(feedbackEditState.item.rating)
      setMessage(
        `You are currently editing Post ID No. ${feedbackEditState.item.id}. 
           Please hit Send to submit your review.`
      )
    }
  }, [feedbackEditState])

 
  const handleTextChange = (e) => {
    if(text === ''){
      setBtnDisabled(true)
      setMessage(null)
    } else if(text !=='' && text.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Review must be at least 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }

    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault() //prevent submit to the actual file
    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }
      if (feedbackEditState.edit === true) {
        updateFeedbackItem(feedbackEditState.item.id, newFeedback)
      } else {
        addFeedback(newFeedback);
      }

      setText('')
      setMessage(null)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate the service?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input 
          onChange={handleTextChange} 
          type='text' 
          placeholder='Write a review here'
          value={text} />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>


    </Card>
  )
}

export default FeedbackForm