import React, { useContext, useEffect, useState } from 'react'

import { UrlContext, UserContext } from '../context'
import RoomChat from '../components/RoomChat'
import ChatNav from '../components/ChatNav'
import Loading from '../components/Loading'
import '../styles/Room.css'

const Room = props => {

    const { roomId } = props.match.params

    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [room, setRoom] = useState(null)

    useEffect(() => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        const fetchRoom = async () => {
            const reponse = await fetch(`${url}/rooms/${roomId}`, {
                method: 'get',
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await reponse.json()
            setRoom(data)
        }
        fetchRoom()
    }, [roomId, url])

    const fetchFriend = () => {
        let friend
        room.users.forEach(userInRoom => {
            if (userInRoom.username !== user.username) {
                friend = userInRoom
            }
        });
        return friend
    }

    const loading = () => <Loading />
    const loaded = () => {
        const friend = fetchFriend()
        return (
            <>
                <ChatNav friend={friend}/>
                <div id="room" className="page">
                    <RoomChat roomId={roomId} messages={room.messages}/>
                </div>
            </>
        )
    }

    return room ? loaded() : loading()
}

export default Room