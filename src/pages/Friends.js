import React, { useContext } from 'react'

import UserContext from '../context/UserContext'
import '../styles/Friends.css'

const Friends = () => {

    const { user } = useContext(UserContext)

    return (
        <div id="friends">
            <div className="header">
                Requests
                <div className="total" style={{background: 'red'}}>
                    {user.requests.length}
                </div>
            </div>
            <div className="header">
                Friends
                <div className="total" style={{background: 'blue'}}>
                    {user.friends.length}
                </div>
            </div>
        </div>
    )
}

export default Friends