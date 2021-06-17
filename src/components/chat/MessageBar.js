import React, { useState } from "react"

import "../../styles/ChatBar.css"

const MessageBar = (props) => {
  const { handleSend } = props

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    handleSend(message)
    setMessage("")
  }

  const renderSendButton = () => {
    return message.length > 0 ? (
      <button onClick={handleSendMessage}>send</button>
    ) : (
      <button></button>
    )
  }

  return (
    <div className="footer">
      <div className="chatbar-container">
        <input
          className="text-input"
          placeholder="Send a message"
          type="text"
          value={message}
          onChange={handleChange}
        />
        {renderSendButton()}
      </div>
    </div>
  )
}

export default MessageBar
