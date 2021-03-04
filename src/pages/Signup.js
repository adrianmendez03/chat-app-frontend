import React from 'react'

import Form from '../components/Form'

const Signup = props => {

    const { url } = props
    const emptyForm = {
        email: '',
        password: '',
        username: ''
    }

    const handleSignup = async newUser => {
        await fetch(url + '/auth/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        props.history.push('/')
    }

    return (
        <div>
            Signup
            <Form handleSubmit={handleSignup} form={emptyForm}/>
        </div>
    )
}

export default Signup