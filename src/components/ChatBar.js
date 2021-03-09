import React, { useState } from 'react'

const ChatBar = props => {

    const { handleSend } = props

    const [message, setMessage] = useState('')

    const handleChange = e => {
        setMessage(e.target.value)
    }

    return (
        <div className="footer">
            <input type="text" value={message} onChange={handleChange}/>
            <button onClick={() => handleSend(message)}><i className="fas fa-share"></i></button>
        </div>
    )
}

export default ChatBar