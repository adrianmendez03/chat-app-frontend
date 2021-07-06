import jwt_decode from "jwt-decode"
import { io } from "socket.io-client"

import { createObjectFromArray } from "../utils"

const URL = process.env.REACT_APP_API_URL

export const updateUser = async (setUser, setSocket = null) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const decoded = jwt_decode(token)

  const response = await fetch(`${URL}/users/${decoded.id}/refresh`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await response.json()

  data.friends = await createObjectFromArray(data.friends)
  data.requests = await createObjectFromArray(data.requests)
  data.rooms = await createObjectFromArray(data.rooms)

  setUser(data)

  if (setSocket) {
    const connection = io("https://socket-io-am.herokuapp.com/")
    connection.emit("saveUser", data.id)
    setSocket(connection)
  }
}

export const handleSignup = async (newUser) => {
  const response = await fetch(URL + "/auth/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
  const data = await response.json()
  return data
}

export const handleLogin = async (formVals, setError) => {
  const response = await fetch(URL + "/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formVals),
  })
  const data = await response.json()

  if (!data.error) {
    const { token } = data
    window.localStorage.setItem("token", JSON.stringify(token))
  } else {
    setError(data.error)
  }
}
