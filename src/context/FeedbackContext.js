 
import {createContext, useState} from 'react'
import {useEffect} from 'react'
//import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

  const [isLoading, setIsLoading] = useState(true)

  const [feedback, setFeedback] = useState([])

  const [feedbackEditState, setFeedbackEditState] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, []) 
  //runs only once bc the array of dependencies is empty

  //fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)

    setIsLoading(false)
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()

    // newFeedback.id = uuidv4()     *Not needed, json-server creates ID automatically
    setFeedback([data, ...feedback])
  }

  const deleteFeedback = (id) => {
    if(window.confirm('Delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  //sets item to be updated
  const editFeedback = (item) => {
    setFeedbackEditState({
      item,
      edit: true
    })
  }

  //Updates the selected item
  const updateFeedbackItem = (id, updatedItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item))
  }

  return (<FeedbackContext.Provider 
    value={{
    feedback,
    feedbackEditState, //Not the function, the state that holds the object, item info
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedbackItem
  }}
  >
    {children}
  </FeedbackContext.Provider>)
}

export default FeedbackContext