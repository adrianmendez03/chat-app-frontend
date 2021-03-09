import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext'
import ProfileIcon from './ProfileIcon'
import '../styles/Friend.css'

const Friend = props => {

    const { friend, privateRooms } = props
    const { user } = useContext(UserContext)

    let privateRoomId = null

    const doesPrivateRoomExistBetweenUserAndFriend = () => {
        privateRooms.forEach(roomId => {
            if (user.rooms[roomId].users.includes(friend.id)) {
                privateRoomId = user.rooms[roomId].id
            }
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