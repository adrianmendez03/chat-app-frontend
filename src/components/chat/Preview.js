import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../../context"
import ProfileIcon from "../utils/ProfileIcon"
import "../../styles/Chat.css"

const Preiview = (props) => {
  const { room } = props
  const { user } = useContext(UserContext)

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

  const fetchChatName = () => {
    let username = ""
    room.users.forEach((userInRoom) => {
      if (userInRoom.username !== user.username) {
        console.log(userInRoom)
        username = userInRoom.username
      }
    })
    return username
  }

  const chatName = fetchChatName()

  return (
    <Link to={`/room/${room.id}`} className="chat">
      <ProfileIcon username={chatName} />
      <div className="content">
        <div className="room-name">{chatName}</div>
        <div className="message">{renderMessage()}</div>
      </div>
    </Link>
  )
}

export default Preiview
