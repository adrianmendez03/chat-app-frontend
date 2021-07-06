import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { fetchFriend } from "../api/room"
import { UserContext } from "../context"
import Loading from "../components/utils/Loading"
import Backpage from "../components/utils/Backpage"
import ProfileIcon from "../components/utils/ProfileIcon"

const User = (props) => {
  const [friend, setFriend] = useState(null)
  const { user } = useContext(UserContext)
  const roomIds = Object.keys(user.rooms)
  let privateRoomId = null

  useEffect(() => {
    const { id } = props.match.params

    const makeApiCall = async () => {
      const data = await fetchFriend(id)
      setFriend(data)
    }

    makeApiCall()
  })

  if (friend) {
    const doesPrivateRoomExistBetweenUserAndFriend = () => {
      roomIds.forEach((roomId) => {
        user.rooms[roomId].users.forEach((userInRoom) => {
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
        <Backpage location={"/home"} />
        <ProfileIcon username={username} personId={props.match.params.id} />
        <div className="username">{username}</div>
        <div className="container">
          <Link to={generateCorrectLink()} className="option">
            <div className="icon"></div>
            <div className="content">Message</div>
          </Link>
          <div className="option">
            <div className="icon"></div>
            <div className="content">Remove Friend</div>
          </div>
        </div>
      </div>
    )
  }

  return friend ? loaded() : loading()
}

export default User
