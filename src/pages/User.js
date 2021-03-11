import React, { useContext, useEffect, useState } from 'react'

import { UrlContext } from '../context'
import Loading from '../components/Loading'
import Backpage from '../components/Backpage'
import ProfileIcon from '../components/ProfileIcon'

const User = props => {


    const [userToDisplay, setUserToDisplay] = useState(null)
    const { url } = useContext(UrlContext)

    useEffect(() => {
        const { id } = props.match.params
        const token = JSON.parse(window.localStorage.getItem('token'))
        const fetchUser = async () => {
            const response = await fetch(`${url}/users/${id}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            setUserToDisplay(data)
        }
        fetchUser()
    }, [props.match.params, url])

    const loading = () => <Loading />
    const loaded = () => {

        const { username } = userToDisplay

        return (
            <div id="user" className="page">
                <Backpage location={'/home'} />
                <ProfileIcon username={username}/>
                <div className="username">{username}</div>
            </div>
        )
    }

    return userToDisplay ? loaded() : loading()
}

export default User 