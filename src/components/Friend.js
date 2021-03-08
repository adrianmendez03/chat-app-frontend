import React from 'react'

import ProfileIcon from './ProfileIcon'
import '../styles/Friend.css'

const Friend = props => {

    const { friend } = props

    return (
        <div className="friend">
            <ProfileIcon username={friend.username} />
            <div className="content">
                {friend.username}
            </div>
        </div>
    )
}

export default Friend