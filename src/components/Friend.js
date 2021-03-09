import React from 'react'
import { Link } from 'react-router-dom';

import ProfileIcon from './ProfileIcon'
import '../styles/Friend.css'

const Friend = props => {
    const { friend } = props

    return (
        <Link to="/home" className="friend">
            <ProfileIcon username={friend.username} />
            <div className="content">
                {friend.username}
            </div>
        </Link>
    )
}

export default Friend