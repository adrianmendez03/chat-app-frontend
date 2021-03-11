import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { UserContext } from '../context'
import ProfileIcon from './ProfileIcon'
import '../styles/Friend.css'

const Friend = props => {

    const { friend, roomIds } = props
    const { user } = useContext(UserContext)

    let privateRoomId = null

    const doesPrivateRoomExistBetweenUserAndFriend = () => {
        roomIds.forEach(roomId => {
            user.rooms[roomId].users.forEach(userInRoom => {
                if (userInRoom.id === friend.id) {
                    privateRoomId = roomId
                }
            })
        })
    }

    doesPrivateRoomExistBetweenUserAndFriend()

    return privateRoomId ? (
        <Link to={`/room/${privateRoomId}`} className="friend">
            <ProfileIcon username={friend.username} />
            <div className="content">
                {friend.username}
            </div>
        </Link>
    ) : (
        <Link to={`/message/${friend.id}`} className="friend">
            <ProfileIcon username={friend.username} />
            <div className="content">
                {friend.username}
            </div>
        </Link>
    )
}

export default Friend