import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

import '../styles/Login.css'
import SocketContext from '../context/SocketContext'
import UserContext from '../context/UserContext'
import UrlContext from '../context/UrlContext'
import Form from '../components/Form'

const Login = props => {

    const { url } = useContext(UrlContext)
    const { user, setUser } = useContext(UserContext)
    const { setSocket } = useContext(SocketContext)
    const [error, setError] = useState('')
    const emptyForm = {
        email: '',
        password: ''
    }

    useEffect(() => {
        if (user) {
            props.history.push('/home')
        }
    }, [props, user])

    const createObjectFromArray = arr => {
        const obj = {}
        arr.forEach(elem => {
            obj[elem.id] = elem
        })
        return obj
    }

    const handleLogin = async user => {
        const response = await fetch(url + '/auth/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (!data.error) {
            const { token } = data
            const { friends, requests, rooms } = data.response

            window.localStorage.setItem('token', JSON.stringify(token))

            data.response.friends = await createObjectFromArray(friends)
            data.response.requests = await createObjectFromArray(requests)
            data.response.rooms = await createObjectFromArray(rooms)

            await setUser(data.response)

            const socket = await io.connect('http://localhost:4000')

            socket.emit('saveUser', data.response.id)

            await setSocket(socket)
            
            props.history.push('/home')
        } else {
            setError(data.error)
        }
    }

    const renderError = () => {
        if (error.length > 0) {
            return (
                <div className="error">
                    {error}
                </div>
            )
        }
    }

    return (
        <div id="login" className="page">
            <div className="header">Login</div>
            <div className="form-container">
                {renderError()}
                <Form handleSubmit={handleLogin} form={emptyForm} />
                <Link to="/signup">Create New Account</Link>
            </div>
        </div>
    )
}

export default Login