import React from 'react'

const Message = ({ message }) => {

    const { user, content } = message 

    return (
        <div className="chat">
            <div className="profile">
                { user.username[0] }
            </div>
            <div className="content">
                <div className="room-name">{user.username}</div>
                <div className="message">{content}</div>
            </div>
        </div>
    )
}

export default Message