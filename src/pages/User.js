import React, { useContext, useEffect } from 'react'

import { UrlContext } from '../context'
import Loading from '../components/Loading'

const User = props => {

    const { id } = props.match.params
    const token = JSON.parse(window.localStorage.getItem('token'))
    const [userToDisplay, setUserToDisplay] = useState(null)
    const { url } = useContext(UrlContext)

    useEffect(() => {
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
    }, [])

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