import React, { useContext } from 'react'

import UrlContext from '../context/UrlContext'
import UserContext from '../context/UserContext'
import ProfileIcon from './ProfileIcon'
import '../styles/Request.css'

const Request = props => {

    const { request } = props
    const response = request.User_Requests.response
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { url } = useContext(UrlContext)
    const { user } = useContext(UserContext)

    const handleUnsend = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${request.id}`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(data)
    }

    const handleDelete = async () => {
        const response = await fetch(`${url}/users/${user.id}/request/${request.id}`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(data)
    }

    const handleAccept = async () => {
        const response = await fetch(`${url}/users/${user.id}/friend/${request.id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        console.log(data)
    }

    const renderActions = () => {
        return response === 'received' ? (
            <>
                <div className="action" onClick={handleAccept} style={{ background: 'rgba(0, 0, 255, 0.5)' }}>accept</div>
                <div className="action" onClick={handleDelete} style={{ background: 'rgba(255, 0, 0, 0.5)' }}>decline</div>
            </>
        ) : (
            <div className="action" onClick={handleUnsend}style={{ background: 'rgba(255, 0, 0, 0.5)' }}>
                un-send
            </div>
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