import React, { useContext } from 'react'

import SocketContext from '../context/SocketContext'
import UserContext from '../context/UserContext'
import UrlContext from '../context/UrlContext'
import ProfileIcon from './ProfileIcon'
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

    return (
        <div className="result">
            <ProfileIcon username={username}/>
            <div className="content">
                <div className="username">{username}</div>
                <i className="fas fa-user-plus" onClick={handleSendRequest}></i>
            </div>
        </div>
    )
}

export default Result