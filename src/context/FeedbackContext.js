import {createContext, useState} from 'react'
import { v4 as uuidv4 } from 'uuid'

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

  const [feedbackEditState, setFeedbackEditState] = useState({
    item: {},
    edit: false
  })

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)

    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if(window.confirm('Delete?')) {
      setFeedback(feedback.filter((item)=> item.id != id))
    }
  }

  //sets item to be updated
  const editFeedback = (item) => {
    setFeedbackEditState({
      item,
      edit: true
    })
  }

  return (<FeedbackContext.Provider 
    value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEditState //Not the function, the state that holds the object, item info
  }}
  >
    {children}
  </FeedbackContext.Provider>)
}

export default FeedbackContext