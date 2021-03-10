import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../context'
import '../styles/Header.css'

const Header = props => {

    console.log(props)
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