import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import '../styles/Room.css'

const Room = props => {

    const { url, signedInUser } = props
    let token = JSON.parse(window.localStorage.getItem('token'))
    const [room, setRoom] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchRoom = async () => {
            const reponse = await fetch(`${url}/rooms/${props.match.params.id}`, {
                method: 'get',
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await reponse.json()
            setRoom(data)
        }
        fetchRoom()
    }, [])

    const handleChange = e => {
        setMessage(e.target.value)
    }

    const handleSend = async e => {
        await fetch(`${url}/rooms/${room.id}/messages/${signedInUser.id}`, {
            method: 'post',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        })
        setMessage('')
    }

    const renderMessages = () => {
        return room.messages.map(message => {
            return <Message message={message} key={message.id}/>
        })
    }

    const loading = () => <h2>Loading</h2>
    const loaded = () => {
        return (
            <>
                <div className="nav">
                    <Link to="/home"><i className="fas fa-arrow-left"></i></Link>
                    {room.name}
                    <i className="fas fa-info"></i>
                </div>
                <div id="room" className="page">
                    <div className="messages">
                        {renderMessages()}
                    </div>
                </div>
                <div className="footer">
                    <input type="text" value={message} onChange={handleChange}/>
                    <button onClick={handleSend}><i className="fas fa-share"></i></button>
                </div>
            </>
        )
    }

    return room ? loaded() : loading()
}

export default Room