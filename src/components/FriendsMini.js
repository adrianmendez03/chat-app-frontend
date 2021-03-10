import React, { useContext } from 'react'

import { UserContext } from '../context'
import Friend from './Friend'
import '../styles/FriendsMini.css'

const FriendsMini = props => {

    const { user } = useContext(UserContext)
    const roomIds = Object.keys(user.rooms)
    const friendIds = Object.keys(user.friends)

    const renderFriends = () => {
        const { friends } = user
        return friendIds.map(friendId => {
            return (
                <div className="mini" key={friendId} >
                    <Friend roomIds={roomIds} friend={friends[friendId]}/>
                    <div className="online-outer">
                        <div className="online-inner"></div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div id="friends-mini">
            {renderFriends()}
        </div>
    )
}

export default FriendsMini