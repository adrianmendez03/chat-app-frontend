import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import UserContext from '../context/UserContext'
import Chat from '../components/Chat'

const Chats = props => {

    const { user } = useContext(UserContext)

    const renderChats = () => {
        return user.rooms.map(room => {
            return (
                <Chat room={room} key={room.id} />
            )
        })
    }

    return (
        <div>
            <Link to="/home/search"><input type="text" placeholder="Search by username"/></Link>
            {renderChats()}
        </div>
    )
}

export default Chats