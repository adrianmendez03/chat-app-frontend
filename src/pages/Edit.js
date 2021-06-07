import React, { useContext, useState, useEffect } from "react"

import { fetchSearchResults } from "../api/search"
import Backpage from "../components/Backpage"

const Edit = () => {
  const [inputVals, setInputVals] = useState({ username: "", file: null })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const makeApiCall = async () => {
      const data = await fetchSearchResults(inputVals.username)
      if (data.length > 0) {
        setMessage("Username is already taken.")
      } else {
        setMessage("Username is available.")
      }
    }

    makeApiCall()
  }, [inputVals])

  const handleTextChange = (e) => {
    setInputVals({ ...inputVals, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setInputVals({ ...inputVals, [e.target.name]: e.target.files[0] })
  }

  return (
    <div id="edit" className="page">
      <Backpage />
      <div className="container">
        <div className="title">Upload Profile Picture</div>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          encType="multipart/form-data"
        />
        <button onClick={() => console.log("clicked")}>Send</button>
      </div>
      <div className="container">
        <div className="title">Change Username</div>
        <input
          className="text-input"
          type="text"
          name="username"
          value={inputVals.username}
          onChange={handleTextChange}
        />
        {message}
      </div>
    </div>
  )
}

export default Edit
