import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Chat.css'

const Chat = props => {

    const { room } = props

    const renderMessage = () => {
        if (room.messages.length === 0) {
            return 'No messages yet.'
        } else {
            return room.messages[room.messages.length -1].content
        }
    }

    return (
        <Link to={`/room/${room.id}`} className="chat">
            <div className="profile">
                { room.users[0].username[0] }
            </div>
            <div className="content">
                <div className="room-name">{room.name}</div>
                <div className="message">{renderMessage()}</div>
            </div>
        </Link>
    )
}

export default Chat