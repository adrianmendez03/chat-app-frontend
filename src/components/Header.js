import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css'
import UserContext from '../context/UserContext'

const Header = props => {

    const { user } = useContext(UserContext)

    return (
        <div className="nav">
            <Link to={`/user/${user.id}`} className="profile">
                { user.username[0] }
            </Link>
        </div>
    )
}

export default Header