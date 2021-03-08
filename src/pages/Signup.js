import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

import UrlContext from '../context/UrlContext'
import Form from '../components/Form'

const Signup = props => {

    const { url } = useContext(UrlContext)
    let token = JSON.parse(window.localStorage.getItem('token'))
    const emptyForm = {
        email: '',
        password: '',
        username: ''
    }

    // useEffect(() => {
    //     console.log(token)
    //     if (token) {
    //         props.history.push('/home')
    //     }
    // }, [props, token])

    const handleSignup = async newUser => {
        await fetch(url + '/auth/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        props.history.push('/')
    }

    return (
        <div id="signup" className="page">
            <div className="header">Signup</div>
            <div className="form-container">
                <Form handleSubmit={handleSignup} form={emptyForm}/>
                <Link to="/">Login</Link>
            </div>
        </div>
    )
}

export default Signup