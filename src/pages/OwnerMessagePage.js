import React, { useState, useEffect } from 'react'
import axios from 'axios' // Make sure axios is installed in your project
import { useLocation, useParams } from 'react-router-dom'

function OwnerMessagePage() {
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')
  const [sendMessageError, setSendMessageError] = useState(null)
  const token = localStorage.getItem('token')

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from')
  const to = params.get('to')
  useEffect(() => {
    // Fetch messages from your API endpoint
    axios
      .get(
        `http://localhost:8080/api/message/${from}/getAllMessagesByBetweenUsers/${to}`,
        {
          headers: {
            Authorization: `Bearer a`,
          },
        }
      )
      .then((response) => {
        setMessages(response.data) // Assuming response.data is an array of messages
      })
      .catch((error) => {
        console.error('Error fetching messages:', error)
      })
  }, [])

  const handleSubmit = () => {
    axios
      .post('http://localhost:8080/api/message/sendMessage', {
        content: content,
        from: to,
        to: from,
      })
      .then((response) => {
        // Message sent successfully, you may want to update the UI or take other actions
        console.log('Message sent successfully:', response.data)
        // Clear the content of the text box after sending the message
        setContent('')
        setSendMessageError(null)
        // Refresh messages after sending a new message
        axios
          .get('YOUR_API_ENDPOINT')
          .then((response) => {
            setMessages(response.data)
          })
          .catch((error) => {
            console.error('Error fetching messages:', error)
          })
      })
      .catch((error) => {
        console.error('Error sending message:', error)
        // Update state to display an error message
        setSendMessageError('Error sending message. Please try again.')
      })
  }

  return (
    <div>
      <h1>Messages</h1>
      <div className="form-group">
        <label htmlFor="contentInput">Content</label>
        <input
          type="text"
          className="form-control"
          id="contentInput"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Send Message
      </button>
      {sendMessageError && <p className="text-danger">{sendMessageError}</p>}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>Date: {new Date(message.dateTime).toLocaleString()}</strong>
            <br />
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OwnerMessagePage
