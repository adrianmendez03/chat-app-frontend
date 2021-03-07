import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

import Form from '../components/Form'

const Login = props => {

    const [error, setError] = useState('')
    const { url, handleUser } = props
    let token = JSON.parse(window.localStorage.getItem('token'))
    const emptyForm = {
        email: '',
        password: ''
    }

    useEffect(() => {
        if (token) {
            props.history.push('/home')
        }
    }, [props, token])

    const handleLogin = async user => {
        if (window.localStorage.getItem('token')) {
            token = JSON.parse(window.localStorage.getItem('token'))
        } else {
            const response = await fetch(url + '/auth/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            if (!data.error) {
                token = data.token
                window.localStorage.setItem('token', JSON.stringify(token))
                await handleUser(data.response)
                props.history.push('/home')
            } else {
                setError(data.error)
            }
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