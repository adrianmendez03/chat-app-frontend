import React, { useContext } from 'react';

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
            {renderChats()}
        </div>
    )
}

export default Chats