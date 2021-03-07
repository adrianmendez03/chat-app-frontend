import React, { useContext } from 'react'
import '../styles/Header.css'

import UserContext from '../context/UserContext'

const Header = props => {

    const { history } = props
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        setUser(null)
        history.push('/')
    }

    return (
        <div className="nav">
            <div className="profile">
                { user.username[0] }
            </div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Header