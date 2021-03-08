import React, { useContext } from 'react'

import UserContext from '../context/UserContext'
import UrlContext from '../context/UrlContext'
import '../styles/Result.css'

const Result = props => {

    const { username, id } = props
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const handleSendRequest = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="result">
            <div className="profile">
                {username[0]}
            </div>
            <div className="content">
                <div className="username">{username}</div>
                <i className="fas fa-user-plus" onClick={handleSendRequest}></i>
            </div>
        </div>
    )
}

export default Result