import React, { useContext, useEffect, useState } from 'react'

import UserContext from '../context/UserContext'
import UrlContext from '../context/UrlContext'
import ProfileIcon from '../components/ProfileIcon'
import Backpage from '../components/Backpage'
import '../styles/User.css'

const User = props => {

    const { id } = props.match.params
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [userToDisplay, setUserToDisplay] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${url}/users/${id}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            setUserToDisplay(data)
        }
        fetchUser()
    }, [])

    const loading = () => <h2>Loading...</h2>
    const loaded = () => {

        const { username } = userToDisplay

        return (
            <div id="user" className="page">
                <Backpage location={'/home'} />
                <ProfileIcon username={username}/>
                <div className="username">{username}</div>
                <div className="container">
                    <div className="option">
                        <div className="icon">
                        </div>
                        <div className="content">
                            Dark Mode
                        </div>
                    </div>
                    <div className="option">
                        <div className="icon">
                        </div>
                        <div className="content">
                            Message Requests
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="title">Account</div>
                    <div className="option">
                        <div className="icon">
                        </div>
                        <div className="content">
                            Username
                        </div>
                    </div>
                    <div className="option">
                        <div className="icon">
                        </div>
                        <div className="content">
                            Delete
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return userToDisplay ? loaded() : loading()
}

export default User