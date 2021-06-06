import io from "socket.io-client"
import { createObjectFromArray } from "../utils"

const URL = process.env.REACT_APP_API_URL

export const refreshUser = async (user, setUser) => {
  const token = JSON.parse(window.localStorage.getItem("token"))

  const response = await fetch(`${URL}/users/${user.id}/refresh`, {
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

export const handleLogin = async (formVals, setUser, setSocket, setError) => {
  const response = await fetch(URL + "/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formVals),
  })

  const data = await response.json()

  if (!data.error) {
    const { token } = data
    const { friends, requests, rooms } = data.response

    window.localStorage.setItem("token", JSON.stringify(token))

    data.response.friends = await createObjectFromArray(friends)
    data.response.requests = await createObjectFromArray(requests)
    data.response.rooms = await createObjectFromArray(rooms)

    await setUser(data.response)

    const socket = await io.connect("https://socket-io-am.herokuapp.com/")

    socket.emit("saveUser", data.response.id)

    await setSocket(socket)
  } else {
    setError(data.error)
  }
}
