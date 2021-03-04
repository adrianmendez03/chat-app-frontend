import React from 'react'
import { Link } from 'react-router-dom'

import Form from '../components/Form'

const Login = props => {

    const { url } = props
    let token
    const emptyForm = {
        email: '',
        password: ''
    }

    const handleLogin = async user => {
        if (window.localStorage.getItem('token')) {
            token = JSON.parse(window.localStorage.getItem('token'))
        } else {
            const response = await fetch(url + '/auth/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            token = await response.json()
            window.localStorage.setItem('token', JSON.stringify(token))
        }
        props.history.push('/home')
    }

    return (
        <div>
            Login
            <Form handleSubmit={handleLogin} form={emptyForm} />
            Don't have an account? Create one <Link to="/signup">here</Link>.
        </div>
    )
}

export default Login