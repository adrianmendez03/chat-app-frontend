import React, { useContext } from 'react'

import { UserContext } from '../context'
import ProfileIcon from './ProfileIcon'
import '../styles/Message.css'

const Message = props => {

    let { message, borderRadius } = props
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

    const reverseBorderRadiusIfSenderIsUser = () => {
        if (message.sender === user.username) {
            borderRadius = borderRadius.split(' ')
            let temp1 = borderRadius[1]
            let temp2 = borderRadius[2]
            borderRadius[1] = borderRadius[0]
            borderRadius[0] = temp1
            borderRadius[2] = borderRadius[3]
            borderRadius[3] = temp2
            borderRadius = borderRadius.join(' ')
        }
        return borderRadius
    }

    return (
        <div className="message" style={{ flexDirection: styles.flexDirection }}>
            <ProfileIcon username={message.user.username} display={{ display: styles.display }} />
            <div className="content" style={{ textAlign: styles.textAlign }}>
                <div className="room-name" style={{ display: styles.display }}>{message.user.username}</div>
                <div className="msg" style={{borderRadius: reverseBorderRadiusIfSenderIsUser()}}>{message.content}</div>
            </div>
        </div>
    )
}

export default Message