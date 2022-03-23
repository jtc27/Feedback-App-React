import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10
    },
    {
      id: 2,
      text: 'This second item is from context',
      rating: 7
    }
  ])

  const deleteFeedback = (id) => {
    if(window.confirm('Delete?')) {
      setFeedback(feedback.filter((item)=> item.id != id))
    }
  }

  return (<FeedbackContext.Provider 
    value={{
    feedback,
    deleteFeedback
  }}
  >
    {children}
  </FeedbackContext.Provider>)
}

export default FeedbackContext