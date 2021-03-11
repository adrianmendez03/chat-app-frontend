import React, { useEffect, useState, useRef, useContext } from 'react'
import io from 'socket.io-client'

import { UserContext, UrlContext } from '../context'
import Message from './Message'
import ChatBar from './ChatBar'

const createMessageStylings = (messages, sender, index) => {

    let borderRadius = ''
    let profileDisplay = 'none'
    let nameDisplay = 'none'
    let marginTop = ''
    const prevMessage = messages[index - 1]
    const nextMessage = messages[index + 1]

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
            profileDisplay = 'flex'
            borderRadius = '5px 25px 25px 25px'
        } else if (sender !== prevSender && sender === nextSender) {
            marginTop = '10px'
            nameDisplay = 'flex'
            borderRadius = '25px 25px 25px 5px'
        } else if (sender === prevSender && sender === nextSender) {
            borderRadius = '5px 25px 25px 5px'
        } else {
            marginTop = '10px'
            profileDisplay = 'flex'
            nameDisplay = 'flex'
            borderRadius = '25px 25px 25px 25px'
        } 
    }
    // Case: Neither messages exist aka only one message in conversation
    else {
        profileDisplay = 'none'
        nameDisplay = 'none'
        borderRadius = '25px 25px 25px 25px'
    }
    return { borderRadius, nameDisplay, profileDisplay, marginTop }
}

const RoomChat = props => {

    const { roomId } = props
    const token = JSON.parse(window.localStorage.getItem('token'))
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [messages, setMessages] = useState(props.messages)
    const socketRef = useRef()
    const bottom = useRef()

	useEffect(() => {
		socketRef.current = io.connect("http://localhost:4000")
        socketRef.current.emit('joinRoom', roomId)
		socketRef.current.on("message", (message) => {
            setMessages([...messages, message])
            bottom.current.scrollIntoView({ behavior: "smooth" })
		})
        if (bottom.current) {
            bottom.current.scrollIntoView({ behavior: "smooth" })
        }
		return () => socketRef.current.disconnect()
	},[messages, roomId])

    const renderMessages = () => {
        return messages.map((message, index) => {
            const stylings = createMessageStylings(messages, message.user.username, index)
            return <Message message={message} stylings={stylings} key={index}/>
        })
    }

    const onMessageSubmit = async message => {
        const response = await fetch(`${url}/rooms/${roomId}/messages/${user.id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        })
        const data = await response.json()
        console.log(data)
        if (data.message) {
            socketRef.current.emit("message", { user: { username: user.username }, content: message })
        }
	}

    return (
        <>
            <div className="messages">
                {renderMessages()}
                <div ref={bottom}/>
            </div>
            <ChatBar handleSend={onMessageSubmit}/>
        </>
    )
}

export default RoomChat