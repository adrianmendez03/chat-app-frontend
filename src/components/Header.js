import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext, HistoryContext } from '../context'
import '../styles/Header.css'

const Header = props => {

    const { user } = useContext(UserContext)
    const { history } = useContext(HistoryContext)

    const renderPageTitle = () => {
        if (history.location.pathname === '/home') {
            return 'Chats'
        } else if (history.location.pathname === 'home/friends') {
            return 'Friends'
        } else {
            return 'Search'
        }
    }

    return (
        <div className="nav">
            <Link to={`/user/${user.id}`} className="profile">
                { user.username[0] }
            </Link>
            <div id="page-title">{ history ? renderPageTitle() : null }</div>
        </div>
    )
}

export default Header