import React, { useContext } from 'react'

import UrlContext from '../context/UrlContext'
import UserContext from '../context/UserContext'
import SocketContext from '../context/SocketContext'
import ProfileIcon from './ProfileIcon'
import Action from './Action'
import '../styles/Request.css'

const Request = props => {

    const { request } = props
    const response = request.User_Requests.response
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { url } = useContext(UrlContext)
    const { user, refreshUser } = useContext(UserContext)
    const { socket } = useContext(SocketContext)

    const handleUnsend = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${request.id}`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', request.id)
        refreshUser(user.id)
        console.log(data)
    }

    const handleDecline = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${request.id}`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', request.id)
        refreshUser(user.id)
        console.log(data)
    }

    const handleAccept = async () => {
        const response = await fetch(`${url}/users/${user.id}/friend/${request.id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        socket.emit('notification', request.id)
        refreshUser(user.id)
        console.log(data)
    }

    const renderActions = () => {
        return response === 'received' ? (
            <>
                <Action type="accept" handleClick={handleAccept} background={{ background: 'rgba(0, 0, 255, 0.5)' }}/>
                <Action type="decline" handleClick={handleDecline} background={{ background: 'rgba(255, 0, 0, 0.5)' }}/>
            </>
        ) : (
            <Action type="unsend" handleClick={handleUnsend} background={{ background: 'rgba(255, 0, 255, 0.5)' }}/>
        )
    }

    return (
        <div className="request">
            <ProfileIcon username={request.username}/>
            <div className="content">
                {request.username}
                <div className="actions">
                    {renderActions()}
                </div>
            </div>
        </div>
    )
}

export default Request