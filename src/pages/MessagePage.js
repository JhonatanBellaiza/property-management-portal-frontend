import React, { useState, useEffect } from 'react'
import axios from 'axios' // Make sure axios is installed in your project
import { useLocation, useParams } from 'react-router-dom'
import './MessagePage.css' // Import your CSS file

function MessagePage() {
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
    if(content == '') return
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
          .get(
            `http://localhost:8080/api/message/${from}/getAllMessagesByBetweenUsers/${to}`
          )
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
    <div className="chat-container">
      <div className="center-container">
        <h5>Messages</h5>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.from == to ? 'message-sent' : 'message-received'}
          >
            <div className="message-bubble">
              <strong className="date-text">
                {' '}
                {new Date(message.dateTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </strong>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      {sendMessageError && <p className="text-danger">{sendMessageError}</p>}
    </div>
  )
}

export default MessagePage
