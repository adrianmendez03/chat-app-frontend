import React from "react"

import { handleAccept, handleDecline, handleUnsend } from "../../api/request"
import ProfileIcon from "../utils/ProfileIcon"
import Action from "./Action"
import "../../styles/Request.css"

const Request = (props) => {
  const { request } = props
  const { response, requestId } = request.User_Requests

  const renderActions = () => {
    return response === "received" ? (
      <>
        <Action
          type="accept"
          handleClick={() => handleAccept(requestId)}
          background={{ background: "cornflowerblue" }}
        />
        <Action
          type="decline"
          handleClick={() => handleDecline(requestId)}
          background={{ background: "rgba(255, 0, 0, 0.8)" }}
        />
      </>
    ) : (
      <Action
        type="unsend"
        handleClick={() => handleUnsend(requestId)}
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
