import React, { useContext } from 'react'

import UserContext from '../context/UserContext'
import Request from '../components/Request'
import Friend from '../components/Friend'
import '../styles/Friends.css'

const Friends = () => {

    const { user } = useContext(UserContext)

    const renderRequests = () => {
        return user.requests.map(request => {
            return <Request request={request} key={request.User_Requests.requestId}/>
        })
    }

    const renderFriends = () => {
        return user.friends.map(friend => {
            return <Friend friend={friend} key={friend.id}/>
        })
    }

    return (
        <div id="friends">
            <div className="requests">
                <div className="header">
                    Requests
                    <div className="total" style={{background: 'red'}}>
                        {user.requests.length}
                    </div>
                </div>
                <div className="requests-container">
                    {renderRequests()}
                </div>
            </div>
            <div className="friends">
                <div className="header">
                    Friends
                    <div className="total" style={{background: 'blue'}}>
                        {user.friends.length}
                    </div>
                </div>
                <div className="friends-container">
                    {renderFriends()}
                </div>
            </div>
        </div>
    )
}

export default Friends