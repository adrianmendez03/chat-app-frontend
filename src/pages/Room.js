import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import UrlContext from '../context/UrlContext'
import UserContext from '../context/UserContext'
import SocketContext from '../context/SocketContext'
import Message from '../components/Message'
import '../styles/Room.css'

const Room = props => {

    const { roomId, friendId } = props.match.params
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const { socket } = useContext(SocketContext)
    const token = JSON.parse(window.localStorage.getItem('token'))
    const [room, setRoom] = useState(null)
    const [friend, setFriend] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => { 
        console.log('user',user)
        if (friendId) {
            const fetchFriend = async () => {
                const reponse = await fetch(`${url}/users/${friendId}`, {
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}`}
                })
                const data = await reponse.json()
                setFriend(data)
            }
            fetchFriend()
        } else {
            const fetchRoom = async () => {
                const reponse = await fetch(`${url}/rooms/${roomId}`, {
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}`}
                })
                const data = await reponse.json()
                setRoom(data)
            }
            fetchRoom()
        }
    }, [roomId, friendId])

    const handleChange = e => {
        setMessage(e.target.value)
    }

    const handleSend = async e => {
        if (room) {
            await fetch(`${url}/rooms/${room.id}/messages/${user.id}`, {
                method: 'post',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message })
            })
            setMessage('')
        } else {
            const response = await fetch(`${url}/rooms/${user.id}/${friendId}`, {
                method: 'post',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: "private", message: {content: message} })
            })
            const data = await response.json()
            console.log(data)
            setMessage('')
            socket.emit('notification', friendId)
            props.history.push(`/room/${data.id}`)
        }
    }

    // const createBorderRadius = (sender, index) => {

    //     let borderRadius
    //     const prevMessage = room.messages[index - 1]
    //     const nextMessage = room.messages[index + 1]

    //     if (!prevMessage && nextMessage) {

    //         if (sender === nextMessage.user.username) {
    //             borderRadius = '25px 25px 25px 5px'
    //         } else {
    //             borderRadius = '25px 25px 25px 25px'
    //         }

    //     } else if (prevMessage && !nextMessage) {

    //         if (sender === prevMessage.user.username) {
    //             borderRadius = '5px 25px 25px 25px'
    //         } else {
    //             borderRadius = '25px 25px 25px 25px'
    //         }

    //     } else if (prevMessage && nextMessage){

    //         const prevSender = prevMessage.user.username
    //         const nextSender = nextMessage.user.username
    //         if (sender === prevSender && sender !== nextSender) {
    //             borderRadius = '5px 25px 25px 25px'
    //         } else if (sender !== prevSender && sender === nextSender) {
    //             borderRadius = '25px 25px 25px 5px'
    //         } else {
    //             borderRadius = '5px 25px 25px 5px'
    //         } 
    //     }
    //     if (sender === user.username) {
    //         borderRadius = borderRadius.split(' ')
    //         let temp1 = borderRadius[1]
    //         let temp2 = borderRadius[2]
    //         borderRadius[1] = borderRadius[0]
    //         borderRadius[0] = temp1
    //         borderRadius[2] = borderRadius[3]
    //         borderRadius[3] = temp2
    //         borderRadius = borderRadius.join(' ')
    //     }
    //     console.log(borderRadius)
    //     return borderRadius
    // }

    const renderMessages = () => {
        return room.messages.map((message, index) => {
            // const borderRadius = createBorderRadius(message.user.username, index)
            return <Message message={message} key={message.id}/>
        })
    }

    const loading = () => <h2>Loading</h2>
    const loaded = () => {
        return (
            <>
                <div className="nav">
                    <Link to="/home"><i className="fas fa-arrow-left"></i></Link>
                    { room ? room.name : friend.username }
                    <i className="fas fa-info"></i>
                </div>
                <div id="room" className="page">
                    <div className="messages">
                        {room ? renderMessages() : null}
                    </div>
                </div>
                <div className="footer">
                    <input type="text" value={message} onChange={handleChange}/>
                    <button onClick={handleSend}><i className="fas fa-share"></i></button>
                </div>
            </>
        )
    }

    return ( room || friend ) ? loaded() : loading()
}

export default Room