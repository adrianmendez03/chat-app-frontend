import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext, HistoryContext } from '../context'
import '../styles/Header.css'

const Header = props => {

    const { user } = useContext(UserContext)
    const { history } = useContext(HistoryContext)

    const renderPageTitle = () => {
        return history.location.pathname === '/home' ? 'Chats' : 'Friends'
    }

    return (
        <div className="nav">
            <Link to={`/user/${user.id}`} className="profile">
                { user.username[0] }
            </Link>
            <div id="page-title">{renderPageTitle()}</div>
        </div>
    )
}

export default Header