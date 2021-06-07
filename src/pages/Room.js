import React, { useContext, useEffect, useState } from "react"

import { fetchRoom } from "../api/room"
import { UserContext } from "../context"
import RoomChat from "../components/RoomChat"
import ChatNav from "../components/ChatNav"
import Loading from "../components/Loading"
import "../styles/Room.css"

const Room = (props) => {
  const { roomId } = props.match.params

  const { user } = useContext(UserContext)
  const [room, setRoom] = useState(null)

  useEffect(() => {
    const makeApiCall = async () => {
      const data = await fetchRoom(roomId)
      setRoom(data)
    }
    makeApiCall()
  }, [roomId])

  const fetchFriend = () => {
    let friend
    room.users.forEach((userInRoom) => {
      if (userInRoom.username !== user.username) {
        friend = userInRoom
      }
    })
    return friend
  }

  const loading = () => <Loading />
  const loaded = () => {
    const friend = fetchFriend()
    return (
      <>
        <ChatNav friend={friend} />
        <div id="room" className="page">
          <RoomChat roomId={roomId} messages={room.messages} />
        </div>
      </>
    )
  }

  return room ? loaded() : loading()
}

export default Room
