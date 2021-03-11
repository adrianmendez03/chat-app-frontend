import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import { UserContext, UrlContext } from '../context'
import Backpage from '../components/Backpage'

const Edit = () => {

    const token = JSON.parse(window.localStorage.getItem('token'))
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [inputVals, setInputVals] = useState({ username: '', file: null })
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (inputVals.username.length > 0) {
                const response = await fetch(`${url}/users/${user.id}/search/${inputVals.username}`, {
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}`}
                })
                const data = await response.json()
                if (data.length > 0) {
                    setMessage('Username is already taken.')
                } else {
                    setMessage('Username is available.')
                }
            } else {
                setMessage('')
            }
        }

        fetchSearchResults()
    }, [inputVals, token, user, url])

    const handleTextChange = e => {
        setInputVals({ ...inputVals, [e.target.name]: e.target.value })
    }

    const handleFileChange = e => {
        setInputVals({ ...inputVals, [e.target.name]: e.target.files[0]})
    }

    const handleFileSubmit = async () => {
        // const response = await fetch(`http://localhost:4500/users/${user.id}/upload`, {
        //     method: 'post',
        //     headers: { Authorization: `Bearer ${token}`},
        //     file: inputVals.file,
        //     body: inputVals.file
        // })
        // const data = await response.json()
        // console.log(data)
        const formData = new FormData()
        formData.append('file', inputVals.file)
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.post(`http://localhost:4500/users/${user.id}/upload`, formData, config)
        const data = await response.json()
        console.log(data)
    }

    return (
        <div id="edit" className="page">
            <Backpage />
            <div className="container">
                <div className="title">Upload Profile Picture</div>
                <input type="file" name="file" onChange={handleFileChange} encType="multipart/form-data"/>
                <button onClick={handleFileSubmit}>Send</button>
            </div>
            <div className="container">
                <div className="title">Change Username</div>
                <input className="text-input" type="text" name="username" value={inputVals.username} onChange={handleTextChange}/>
                {message}
            </div>
        </div>
    )
}

export default Edit