import jwt_decode from "jwt-decode"
const URL = process.env.REACT_APP_API_URL

export const sendMessage = async (message, roomId) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = jwt_decode(token)

  const response = await fetch(`${URL}/rooms/${roomId}/messages/${user.id}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message }),
  })

  const data = await response.json()
  return data
}

export const fetchRoom = async (roomId) => {
  const token = JSON.parse(window.localStorage.getItem("token"))

  const reponse = await fetch(`${URL}/rooms/${roomId}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await reponse.json()

  return data
}

export const fetchFriend = async (friendId) => {
  const token = JSON.parse(window.localStorage.getItem("token"))

  const reponse = await fetch(`${URL}/users/${friendId}`, {
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await reponse.json()

  return data
}
