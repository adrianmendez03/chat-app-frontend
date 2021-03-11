import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { UserContext } from '../context'
import Chat from '../components/Chat'
import FriendsMini from '../components/FriendsMini'
import Loading from '../components/Loading'

const Chats = props => {

    const { user } = useContext(UserContext)
    let roomIds
    if (user) {
        roomIds = Object.keys(user.rooms)
    }

    const renderChats = () => {
        return roomIds.map(roomId => {
            return (
                <Chat room={user.rooms[roomId]} key={roomId} />
            )
        })
    }

    const loading = () => <Loading />
    const loaded = () => {
        console.log(roomIds)
        return (
            <div className="page">
                <FriendsMini />
                <Link to="/home/search"><input className="text-input" type="text" placeholder="Search by username"/></Link>
                {renderChats()}
            </div>
        )
    }

    return roomIds ? loaded() : loading()

}

export default Chats