import React, { useContext } from "react"
import { useHistory } from "react-router-dom"

import { handleAccept, handleDecline, handleUnsend } from "../../api/request"
import { updateUser } from "../../api/user"
import ProfileIcon from "../utils/ProfileIcon"
import Action from "./Action"
import { SocketContext, UserContext } from "../../context"
import { notifyUser } from "../../utils"
import "../../styles/Request.css"

const Request = (props) => {
  const history = useHistory()
  const { user, setUser } = useContext(UserContext)
  const { socket } = useContext(SocketContext)
  const { request } = props
  const { response, requestId, userId } = request.User_Requests
  const otherUserId = user.id === userId ? requestId : userId

  const renderActions = () => {
    return response === "received" ? (
      <>
        <Action
          type="accept"
          handleClick={async () => {
            const response = await handleAccept(requestId, request.id)
            notifyUser(socket, otherUserId)
            await updateUser(setUser)
            history.push(`/room/${response.id}`)
          }}
          background={{ background: "cornflowerblue" }}
        />
        <Action
          type="decline"
          handleClick={async () => {
            await handleDecline(requestId)
            updateUser(setUser)
            notifyUser(socket, otherUserId)
          }}
          background={{ background: "rgba(255, 0, 0, 0.8)" }}
        />
      </>
    ) : (
      <Action
        type="unsend"
        handleClick={async () => {
          await handleUnsend(requestId)
          updateUser(setUser)
          notifyUser(socket, otherUserId)
        }}
        background={{ background: "rgba(255, 0, 255, 0.5)" }}
      />
    )
  }

  return (
    <div className="request">
      <ProfileIcon username={request.username} />
      <div className="content">
        {request.username}
        <div className="actions">{renderActions()}</div>
      </div>
    </div>
  )
}

export default Request
