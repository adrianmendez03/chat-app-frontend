import React, { useCallback, useContext, useEffect, useState } from 'react'

import UrlContext from '../context/UrlContext'
import UserContext from '../context/UserContext'
import SocketContext from '../context/SocketContext'
import Message from '../components/Message'
import ChatBar from '../components/ChatBar'
import ChatNav from '../components/ChatNav'
import '../styles/Room.css'

const createBorderRadius = (room, sender, index) => {

        let borderRadius = ''
        const prevMessage = room.messages[index - 1]
        const nextMessage = room.messages[index + 1]

        // Case: Previous message does not exist - Next message does exist
        if (!prevMessage && nextMessage) {
            if (sender === nextMessage.user.username) {
                borderRadius = '25px 25px 25px 5px'
            } else {
                borderRadius = '25px 25px 25px 25px'
            }
        } 
        // Case: Previous message does exist - Next message does not exist
        else if (prevMessage && !nextMessage) {

            if (sender === prevMessage.user.username) {
                borderRadius = '5px 25px 25px 25px'
            } else {
                borderRadius = '25px 25px 25px 25px'
            }

        } 
        // Case: Both Previous and Next message exist
        else if (prevMessage && nextMessage){

            const prevSender = prevMessage.user.username
            const nextSender = nextMessage.user.username
            if (sender === prevSender && sender !== nextSender) {
                borderRadius = '5px 25px 25px 25px'
            } else if (sender !== prevSender && sender === nextSender) {
                borderRadius = '25px 25px 25px 5px'
            } else {
                borderRadius = '5px 25px 25px 5px'
            } 
        }
        // Case: Neither messages exist aka only one message in conversation
        else {
            borderRadius = '25px 25px 25px 25px'
        }
        return borderRadius
}

const Room = props => {

    const { roomId } = props.match.params
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const { socket } = useContext(SocketContext)
    const token = JSON.parse(window.localStorage.getItem('token'))
    const [room, setRoom] = useState(null)
    const [messages, setMessages] = useState(null)

    console.log('refresh')

    socket.on('newMessage', () => {
        console.log('new message')
        // fetchRoom()
    })

    const fetchRoom = useCallback(async () => {
        const reponse = await fetch(`${url}/rooms/${roomId}`, {
            method: 'get',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await reponse.json()
        console.log(data)
        setRoom(data)
        setMessages(data.messages)
    }, [])

    useEffect(() => {

        fetchRoom()
        socket.emit('joinRoom', roomId)

        return () => {
            socket.emit('leaveRoom', roomId)
            setRoom(null)
            setMessages(null)
        }
    }, [])

    const handleSend = async (message) => {
        const response = await fetch(`${url}/rooms/${room.id}/messages/${user.id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        })
        const data = await response.json()
        if (data.message) {
            socket.emit('message', { content: message, user: { username: user.username }})
        } 
    }

    const renderMessages = () => {
        return messages.map((message, index) => {
            const borderRadius = createBorderRadius(room, message.user.username, index)
            return <Message message={message} borderRadius={borderRadius} key={message.id}/>
        })
    }

    const loading = () => <h2>Loading</h2>
    const loaded = () => {
        return (
            <>
                <ChatNav name={room.name}/>
                <div id="room" className="page">
                    <div className="messages">
                        {renderMessages()}
                    </div>
                </div>
                <ChatBar handleSend={handleSend}/>
            </>
        )
    }

    return messages ? loaded() : loading()
}

export default Room