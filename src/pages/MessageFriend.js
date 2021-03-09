import React, { useEffect, useContext, useState } from 'react'

import UrlContext from '../context/UrlContext'
import UserContext from '../context/UserContext'
import SocketContext from '../context/SocketContext'
import ChatBar from '../components/ChatBar'
import ChatNav from '../components/ChatNav'

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

    const loading = () => <h2>Loading</h2>
    const loaded = () => {
        return (
            <>
                <ChatNav name={friend.username}/>
                <div id="room" className="page"></div>
                <ChatBar handleSend={handleSend}/>
            </>
        )
    }

    return friend ? loaded() : loading()
}

export default MessageFriend