import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import {
  handleDecline,
  handleAccept,
  handleUnsend,
  handleSend,
} from "../../api/request"
import { UserContext } from "../../context"
import ProfileIcon from "../utils/ProfileIcon"
import Action from "./Action"
import "../../styles/Result.css"

const Result = (props) => {
  const { username, id } = props
  const { user } = useContext(UserContext)
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
  }, [])

  const renderRequestActions = (response) => {
    return response === "received" ? (
      <>
        <Action
          type="accept"
          handleClick={handleAccept}
          background={{ background: "cornflowerblue" }}
        />
        <Action
          type="decline"
          handleClick={handleDecline}
          background={{ background: "rgba(255, 0, 0, 0.8)" }}
        />
      </>
    ) : (
      <Action
        type="unsend"
        handleClick={handleUnsend}
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
    else if (info.requestId) {
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
          handleClick={() => handleSend(id)}
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
