import React, { useEffect, useContext, useState } from 'react'

import {
    UserContext,
    SocketContext,
    UrlContext
} from '../context'
import ChatBar from '../components/ChatBar'
import ChatNav from '../components/ChatNav'
import Loading from '../components/Loading'

const MessageFriend = props => {

    const { friendId } = props.match.params
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const { socket } = useContext(SocketContext)
    const [friend, setFriend] = useState(null)

    useEffect(() => {
        const fetchFriend = async () => {
            const reponse = await fetch(`${url}/users/${friendId}`, {
                method: 'get',
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await reponse.json()
            setFriend(data)
        }
        fetchFriend()
    }, [friendId, token, url])

    const handleSend = async (message) => {
        const response = await fetch(`${url}/rooms/${user.id}/${friendId}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "private", message: { content: message } })
        })
        const data = await response.json()
        socket.emit('notification', friendId)
        props.history.push(`/room/${data.id}`)
    }

    const loading = () => <Loading />
    const loaded = () => {
        return (
            <>
                <ChatNav friend={friend}/>
                <div id="room" className="page"></div>
                <ChatBar handleSend={handleSend}/>
            </>
        )
    }

    return friend ? loaded() : loading()
}

export default MessageFriend