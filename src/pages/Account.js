import React, { useContext, useEffect, useState } from 'react'

import {
    UserContext,
    SocketContext,
    HistoryContext
} from '../context'
import ProfileIcon from '../components/ProfileIcon'
import Backpage from '../components/Backpage'
import Loading from '../components/Loading'
import '../styles/User.css'

const Account = props => {

    const { socket, setSocket } = useContext(SocketContext)
    const { user, setUser } = useContext(UserContext)
    const { history } = useContext(HistoryContext)

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        setUser(null)
        socket.disconnect()
        setSocket(null)
        history.push('/')
    }

    const loading = () => <Loading />
    const loaded = () => {

        const { username } = user

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
                    <div className="option" onClick={() => history.push('/home/friends')}>
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
                    <div className="option" onClick={handleLogout}>
                        <div className="icon">
                        </div>
                        <div className="content">
                            Logout
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

    return user ? loaded() : loading()
}

export default Account