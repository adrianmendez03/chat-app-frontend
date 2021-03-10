import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { UserContext } from '../context'
import Chat from '../components/Chat'
import FriendsMini from '../components/FriendsMini'

const Chats = props => {

    const { user } = useContext(UserContext)
    const roomIds = Object.keys(user.rooms)

    const renderChats = () => {
        return roomIds.map(roomId => {
            return (
                <Chat room={user.rooms[roomId]} key={roomId} />
            )
        })
    }

    return (
        <div className="page">
            <FriendsMini />
            <Link to="/home/search"><input className="text-input" type="text" placeholder="Search by username"/></Link>
            {renderChats()}
        </div>
    )
}

export default Chats