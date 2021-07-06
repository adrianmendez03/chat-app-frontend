import React, { useContext, useEffect, useState } from "react"

import { SocketContext, UserContext } from "../../context"
import "../../styles/Profile.css"

const ProfileIcon = (props) => {
  const { display, username, personId } = props
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const [color, setColor] = useState({ backgroundColor: "red" })

  useEffect(() => {
    if (socket) {
      socket.emit("isOnline", user.id, personId)
      socket.on("response", (response) => {
        if (response === "yes") {
          setColor({ backgroundColor: "green" })
        } else {
          setColor({ backgroundColor: "red" })
        }
      })
    }
  }, [socket, personId, user.id])

  return (
    <div className="profile" style={display}>
      {username && username[0]}
      <div className="online-outer">
        <div className="online-inner" style={color}></div>
      </div>
    </div>
  )
}

export default ProfileIcon
