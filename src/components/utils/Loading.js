import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import "../../styles/Loading.css"

const Loading = () => {
  const history = useHistory()

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    if (!token) {
      history.push("/")
    }
  })

  return (
    <div className="loading-container">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>{" "}
    </div>
  )
}

export default Loading
