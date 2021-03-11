import React, { useContext } from 'react'

import { UserContext } from '../context'
import ProfileIcon from './ProfileIcon'
import '../styles/Message.css'

const Message = props => {

    let { message, stylings } = props
    let { borderRadius, nameDisplay, profileDisplay, marginTop } = stylings
    let marginLeft, alignItems, background, color
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

    if (message.user.username === user.username) {
        profileDisplay = 'none'
        nameDisplay ='none'
        alignItems = 'flex-end'
        borderRadius = borderRadius.split(' ')
        background = 'cornflowerblue'
        color = 'white'
        let temp1 = borderRadius[1]
        let temp2 = borderRadius[2]
        borderRadius[1] = borderRadius[0]
        borderRadius[0] = temp1
        borderRadius[2] = borderRadius[3]
        borderRadius[3] = temp2
        borderRadius = borderRadius.join(' ')
    }

    if (profileDisplay === 'none') {
        marginLeft = '20px'
    }

    return (
        <div className="message" style={{ flexDirection: styles.flexDirection }}>
            <ProfileIcon username={message.user.username} display={{ display: profileDisplay }} />
            <div className="content" style={{ textAlign: styles.textAlign, marginLeft: marginLeft, marginTop: marginTop,  alignItems: alignItems}}>
                <div className="room-name" style={{ display: nameDisplay }}>{message.user.username}</div>
                <div className="msg" style={{borderRadius: borderRadius, background: background, color: color}}>{message.content}</div>
            </div>
        </div>
    )
}

export default Message