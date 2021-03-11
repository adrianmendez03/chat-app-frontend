import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { UrlContext, UserContext } from '../context'
import Loading from '../components/Loading'
import Backpage from '../components/Backpage'
import ProfileIcon from '../components/ProfileIcon'

const User = props => {


    const [friend, setFriend] = useState(null)
    const { url } = useContext(UrlContext)
    const { user } = useContext(UserContext)
    const roomIds = Object.keys(user.rooms)
    let privateRoomId = null

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
            setFriend(data)
        }
        fetchUser()
    }, [props.match.params, url])

    if (friend) {
        const doesPrivateRoomExistBetweenUserAndFriend = () => {
            roomIds.forEach(roomId => {
                user.rooms[roomId].users.forEach(userInRoom => {
                    console.log(roomId, userInRoom.id, friend.id)
                    if (userInRoom.id === friend.id) {
                        privateRoomId = roomId
                    }
                })
            })
        }
    
        doesPrivateRoomExistBetweenUserAndFriend()
    }

    const generateCorrectLink = () => {
        return privateRoomId ? `/room/${privateRoomId}` : `/message/${friend.id}`
    }

    const loading = () => <Loading />
    const loaded = () => {

        const { username } = friend

        return (
            <div id="user" className="page">
                <Backpage location={'/home'} />
                <ProfileIcon username={username}/>
                <div className="username">{username}</div>
                <div className="container">
                    <Link to={generateCorrectLink()} className="option">
                            <div className="icon">
                            </div>
                            <div className="content">
                                Message
                            </div>
                    </Link>
                    <div className="option">
                        <div className="icon">
                        </div>
                        <div className="content">
                            Remove Friend
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return friend ? loaded() : loading()
}

export default User 