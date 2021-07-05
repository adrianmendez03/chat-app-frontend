import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { UserContext } from "../context"
import ProfileIcon from "./utils/ProfileIcon"
import Action from "./search/Action"
import "../styles/Friend.css"

const Friend = (props) => {
  const { friend } = props
  const history = useHistory()
  const { user } = useContext(UserContext)
  const [roomId, setRoomId] = useState(null)

  useEffect(() => {
    for (let room of Object.values(user.rooms)) {
      for (let member of Object.values(room.users)) {
        if (member.id === friend.id) {
          setRoomId(room.id)
        }
      }
    }
  }, [])

  const handleSendMessage = () => {
    history.push(`/room/${roomId}`)
  }

  return (
    <div to={`/room/${roomId}`} className="friend">
      <ProfileIcon username={friend.username} />
      <div className="content">
        <div className="username">{friend.username}</div>
        <div className="actions">
          <Action
            type="message"
            handleClick={handleSendMessage}
            background={{ background: `cornflowerblue` }}
          />
        </div>
      </div>
    </div>
  )
}

export default Friend
