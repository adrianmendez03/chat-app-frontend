import React from 'react';

import Chat from '../components/Chat'

const Chats = props => {

    const { signedInUser } = props

    const renderChats = () => {
        return signedInUser.rooms.map(room => {
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