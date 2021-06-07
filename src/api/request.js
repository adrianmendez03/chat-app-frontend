import jwt_decode from "jwt-decode"

const URL = process.env.REACT_APP_REACT_URL

export const handleUnsend = async (requestId) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = jwt_decode(token)

  const response = await fetch(`${URL}/users/${user.id}/request/${requestId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await response.json()

  return data
}

export const handleAccept = async (requestId) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = jwt_decode(token)

  const response = await fetch(`${URL}/users/${user.id}/friend/${requestId}`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await response.json()

  return data
}

export const handleDecline = async (requestId) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = jwt_decode(token)

  const response = await fetch(`${URL}/users/${user.id}/request/${requestId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await response.json()

  return data
}
