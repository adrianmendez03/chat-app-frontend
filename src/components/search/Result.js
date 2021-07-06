import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import {
  handleDecline,
  handleAccept,
  handleUnsend,
  handleSend,
} from "../../api/request"
import { updateUser } from "../../api/user"
import { SocketContext, UserContext } from "../../context"
import ProfileIcon from "../utils/ProfileIcon"
import Action from "./Action"
import "../../styles/Result.css"
import { notifyUser } from "../../utils"

const Result = (props) => {
  const { username, id } = props
  const { user, setUser } = useContext(UserContext)
  const { socket } = useContext(SocketContext)
  const history = useHistory()
  const [info, setInfo] = useState({
    roomId: null,
    requestId: null,
  })

  useEffect(() => {
    // If user is already friends with this person...
    if (user.friends[id]) {
      // ... look for their room id.
      for (let room of Object.values(user.rooms)) {
        for (let roomUser of Object.values(room.users)) {
          if (roomUser.username === username) {
            setInfo({
              ...info,
              roomId: room.id,
            })
          }
        }
      }
    }
    // Else ...
    else {
      // ... look through the users requests and see if they already have a request from this person.
      for (let request of Object.values(user.requests)) {
        const { requestId, userId } = request.User_Requests
        if (id === requestId || id === userId) {
          setInfo({
            ...info,
            requestId: request.id,
          })
        }
      }
    }
  }, [user.requests])

  const renderRequestActions = (response) => {
    return response === "received" ? (
      <>
        <Action
          type="accept"
          handleClick={() => {
            handleAccept(info.requestId, id)
            notifyUser(socket, id)
          }}
          background={{ background: "cornflowerblue" }}
        />
        <Action
          type="decline"
          handleClick={async () => {
            await handleDecline(info.requestId)
            notifyUser(socket, id)
            updateUser(setUser)
          }}
          background={{ background: "rgba(255, 0, 0, 0.8)" }}
        />
      </>
    ) : (
      <Action
        type="unsend"
        handleClick={async () => {
          await handleUnsend(info.requestId)
          notifyUser(socket, id)
          updateUser(setUser)
        }}
        background={{ background: "rgba(255, 0, 0, 0.8)" }}
      />
    )
  }

  const handleSendMessage = () => {
    history.push(`/room/${info.roomId}`)
  }

  const renderActions = () => {
    // If the user is already friends with the person...
    if (info.roomId) {
      // ... message the person.
      return (
        <Action
          type="message"
          handleClick={handleSendMessage}
          background={{ background: `cornflowerblue` }}
        />
      )
    }
    // If a request already exists...
    else if (user.requests[info.requestId]) {
      // ... render request actions.
      return renderRequestActions(
        user.requests[info.requestId].User_Requests.response
      )
    }
    // Else ...
    else {
      // ... send a friend request.
      return (
        <Action
          type="send friend request"
          handleClick={async () => {
            await handleSend(id)
            notifyUser(socket, id)
            updateUser(setUser)
          }}
          background={{ background: "cornflowerblue" }}
        />
      )
    }
  }

  return (
    <div className="result">
      <ProfileIcon username={username} />
      <div className="content">
        <div className="username">{username}</div>
        <div className="actions">{renderActions()}</div>
      </div>
    </div>
  )
}

export default Result
