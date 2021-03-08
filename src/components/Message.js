import React, { useContext } from 'react'

import UserContext from '../context/UserContext'
import ProfileIcon from './ProfileIcon'
import '../styles/Message.css'

const Message = ({ message, borderRadius }) => {

    const { user } = useContext(UserContext)
    const styles = message.user.username === user.username ? ({ 
            flexDirection: 'row-reverse', 
            display: 'none',
            textAlign: 'right' 
        }) : ({ 
            flexDirection: 'row', 
            display: 'flex',
            textAlign: 'left' 
        })

    return (
        <div className="message" style={{ flexDirection: styles.flexDirection }}>
            <ProfileIcon username={message.user.username} display={{ display: styles.display }} />
            <div className="content" style={{ textAlign: styles.textAlign }}>
                <div className="room-name" style={{ display: styles.display }}>{message.user.username}</div>
                <div className="msg" style={borderRadius}>{message.content}</div>
            </div>
        </div>
    )
}

export default Message