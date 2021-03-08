import React, { useContext } from 'react'

import UserContext from '../context/UserContext'
import Request from '../components/Request'
import Friend from '../components/Friend'
import '../styles/Friends.css'

const Friends = () => {

    const { user } = useContext(UserContext)
    const friendIds = Object.keys(user.friends)

    const renderRequests = () => {
        return user.requests.map(request => {
            return <Request request={request} key={request.User_Requests.requestId}/>
        })
    }

    const renderFriends = () => {
        const { friends } = user
        return friendIds.map(friendId => {
            return <Friend friend={friends[friendId]} key={friendId} />
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
                        {friendIds.length}
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