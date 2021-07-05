import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { fetchRoom } from "../api/room"
import { UserContext } from "../context"
import Display from "../components/chat/Display"
import Header from "../components/chat/Header"
import Loading from "../components/utils/Loading"
import "../styles/Room.css"
import { updateUser } from "../api/user"

const Room = (props) => {
  const { roomId } = props.match.params
  const token = JSON.parse(window.localStorage.getItem("token"))
  const history = useHistory()

  const { user, setUser } = useContext(UserContext)
  const [room, setRoom] = useState(null)

  useEffect(() => {
    if (!token) {
      history.push("/")
    } else {
      updateUser(setUser)

      const makeApiCall = async () => {
        const data = await fetchRoom(roomId)
        setRoom(data)
      }

      makeApiCall()
    }
  }, [token, history, setUser, roomId])

  const fetchFriend = () => {
    for (let member of Object.values(room.users)) {
      console.log(user)
      if (member.id !== user.id) {
        return member
      }
    }
  }

  const loading = () => <Loading />
  const loaded = () => {
    const friend = fetchFriend()
    return (
      <>
        <Header friend={friend} />
        <div id="room" className="page">
          <Display roomId={roomId} messages={room.messages} />
        </div>
      </>
    )
  }

  return room && user ? loaded() : loading()
}

export default Room
