import React, { useContext } from "react"

import {
  handleDecline,
  handleAccept,
  handleSend,
  handleUnsend,
} from "../api/request"
import { UserContext } from "../context"
import ProfileIcon from "./ProfileIcon"
import Action from "./Action"
import "../styles/Result.css"

const Result = (props) => {
  let idOfRequest
  const { username, id } = props
  const { user } = useContext(UserContext)

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

  const doesARequestAlreadyExist = () => {
    const requestIds = Object.keys(user.requests)
    let answer = false
    for (let requestId of requestIds) {
      if (id === user.requests[requestId].id) {
        idOfRequest = requestId
        answer = true
        break
      }
    }
    return answer
  }

  const renderActions = () => {
    if (user.friends[id]) {
      return (
        <Action
          type="message"
          //   handleClick={handleSendMessage}
          background={{ background: `cornflowerblue` }}
        />
      )
    } else if (doesARequestAlreadyExist()) {
      return renderRequestActions(
        user.requests[idOfRequest].User_Requests.response
      )
    } else {
      return (
        <Action
          type="send friend request"
          //   handleClick={handleSendRequest}
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
