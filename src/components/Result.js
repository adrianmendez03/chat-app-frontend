import React, { useContext } from 'react'

import {
    UserContext,
    SocketContext,
    UrlContext
} from '../context'
import ProfileIcon from './ProfileIcon'
import Action from './Action'
import '../styles/Result.css'

const Result = props => {

    const { username, id } = props
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { socket } = useContext(SocketContext)
    const { user, refreshUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const handleSendRequest = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', id)
        refreshUser(user.id)
        console.log(data)
    }

    const handleSendMessage = () => {
        console.log(`send message i'll figure this out later`)
    }

    const renderActions = () => {
        if (user.friends[id]) {
            return <Action type="message" handleClick={handleSendMessage} background={{ background: `rgba(0, 0, 255, 0.6)`}} />
        } else {
            return <Action type="send friend request" handleClick={handleSendRequest} background={{ background: 'rgba(0, 0, 255, 0.6)'}}/>
        }
        
    }

    return (
        <div className="result">
            <ProfileIcon username={username}/>
            <div className="content">
                <div className="username">{username}</div>
                <div className="actions">
                    {renderActions()}
                </div>
            </div>
        </div>
    )
}

export default Result