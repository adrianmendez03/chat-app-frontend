import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../../context"
import ProfileIcon from "../utils/ProfileIcon"
import Loading from "../utils/Loading"
import "../../styles/Chat.css"

const Preiview = (props) => {
  const { room } = props
  const { user } = useContext(UserContext)
  const [chatInfo, setChatInfo] = useState(null)

  useEffect(() => {
    const fetchChatName = () => {
      room.users.forEach((userInRoom) => {
        if (userInRoom.username !== user.username) {
          console.log("blah")
          setChatInfo({ name: userInRoom.username, id: userInRoom.id })
        }
      })
    }

    fetchChatName()
  }, [room])

  const renderMessage = () => {
    if (room.messages.length === 0) {
      return "No messages yet."
    } else {
      let lastMessage = room.messages[room.messages.length - 1].content
      if (lastMessage.length > 50) {
        lastMessage = lastMessage.slice(0, 50)
        lastMessage += "..."
      }
      return lastMessage
    }
  }

  return chatInfo ? (
    <Link to={`/room/${room.id}`} className="chat">
      <ProfileIcon username={chatInfo.name} personId={chatInfo.id} />
      <div className="content">
        <div className="room-name">{chatInfo.name}</div>
        <div className="message">{renderMessage()}</div>
      </div>
    </Link>
  ) : (
    <Loading />
  )
}

export default Preiview
