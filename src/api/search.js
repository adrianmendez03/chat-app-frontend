import jwt_decode from "jwt-decode"

const URL = process.env.REACT_APP_API_URL

export const fetchSearchResults = async (searchVal, setResults) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const decoded = jwt_decode(token)

  if (searchVal.length > 0) {
    const response = await fetch(
      `${URL}/users/${decoded.id}/search/${searchVal}`,
      {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    setResults(data)
  } else {
    setResults([])
  }
}
