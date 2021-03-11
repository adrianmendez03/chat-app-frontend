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

    let idOfRequest
    const { username, id } = props
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { socket } = useContext(SocketContext)
    const { user, refreshUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const handleUnsend = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${user.requests[idOfRequest].id}`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', user.requests[idOfRequest].id)
        refreshUser(user.id)
        console.log(data)
    }

    const handleDecline = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${user.requests[idOfRequest].id}`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', user.requests[idOfRequest].id)
        refreshUser(user.id)
        console.log(data)
    }

    const handleAccept = async () => {
        const response = await fetch(`${url}/users/${user.id}/friend/${user.requests[idOfRequest].id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', user.requests[idOfRequest].id)
        refreshUser(user.id)
        console.log(data)
    }

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

    const renderRequestActions = response => {
        console.log(response)
        return response === 'received' ? (
            <>
                <Action type="accept" handleClick={handleAccept} background={{ background: 'cornflowerblue' }}/>
                <Action type="decline" handleClick={handleDecline} background={{ background: 'rgba(255, 0, 0, 0.8)' }}/>
            </>
        ) : (
            <Action type="unsend" handleClick={handleUnsend} background={{ background: 'rgba(255, 0, 255, 0.5)' }}/>
        )
    }

    const doesARequestAlreadyExist = () => {
        console.log('tri')
        const requestIds = Object.keys(user.requests)
        let answer = false
        for (let requestId of requestIds) {
            console.log(id, user.requests[requestId].id)
            if (id === user.requests[requestId].id) {
                idOfRequest = requestId
                answer = true
                break
            }
        }
        return answer
    }

    const renderActions = () => {
        if (user.friends[id]) {
            return <Action type="message" handleClick={handleSendMessage} background={{ background: `cornflowerblue`}} />
        } else if (doesARequestAlreadyExist()) {
            return renderRequestActions(user.requests[idOfRequest].User_Requests.response)
        } else {
            return <Action type="send friend request" handleClick={handleSendRequest} background={{ background: 'cornflowerblue'}}/>
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