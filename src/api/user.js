import io from "socket.io-client"
import jwt_decode from "jwt-decode"

import { createObjectFromArray } from "../utils"

const URL = process.env.REACT_APP_API_URL

export const refreshUser = async (setUser) => {
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
}

export const handleSignup = async (newUser) => {
  await fetch(URL + "/auth/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
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

  return
}
