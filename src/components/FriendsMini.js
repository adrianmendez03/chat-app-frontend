import React, { useContext, useRef, useEffect, useState } from "react"
import io from "socket.io-client"

import { UserContext } from "../context"
import ProfileIcon from "./utils/ProfileIcon"
import "../styles/FriendsMini.css"

const FriendsMini = (props) => {
  const { user } = useContext(UserContext)
  const roomIds = Object.keys(user.rooms)
  const friends = Object.values(user.friends)
  const socketRef = useRef()
  const [clients, setClients] = useState([])

  useEffect(() => {
    socketRef.current = io.connect("https://socket-io-am.herokuapp.com/")
    socketRef.current.on("newUser", (clients) => {
      setClients([...Object.keys(clients)])
    })
    socketRef.current.on("userLeft", (clients) => {
      setClients([...Object.keys(clients)])
    })
    return () => socketRef.current.disconnect()
  }, [clients, socketRef])

  const renderColor = (friendId) => {
    let color = "red"
    for (let id of clients) {
      if (friendId === id) {
        color = "green"
        break
      }
    }
    return color
  }

  const renderFriends = () => {
    return friends.map((friend) => {
      return (
        <div className="mini" key={friend.id}>
          <ProfileIcon username={friend.username} personId={friend.id} />
        </div>
      )
    })
  }

  return <div id="friends-mini">{renderFriends()}</div>
}

export default FriendsMini
