import React from 'react'
import '../styles/Header.css'

const Header = props => {

    const { signedInUser, handleUser, history } = props

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        handleUser(null)
        history.push('/')
    }

    return (
        <div className="nav">
            <div className="profile">
                { signedInUser.username[0] }
            </div>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Header