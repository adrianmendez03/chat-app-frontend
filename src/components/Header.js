import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css'
import SocketContext from '../context/SocketContext'
import UserContext from '../context/UserContext'

const Header = props => {

    const { history } = props
    const { user, setUser } = useContext(UserContext)
    const { socket, setSocket } = useContext(SocketContext)

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        setUser(null)
        socket.disconnect()
        setSocket(null)
        history.push('/')
    }

    return (
        <div className="nav">
            <Link to={`/user/${user.id}`} className="profile">
                { user.username[0] }
            </Link>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Header