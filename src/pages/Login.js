import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { handleLogin } from "../api/user"
import Form from "../components/Form"
import "../styles/Login.css"

const Login = (props) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const history = useHistory()
  const [error, setError] = useState("")
  const emptyForm = {
    email: "",
    password: "",
  }

  useEffect(() => {
    if (token) {
      props.history.push("/home")
    }
  })

  return (
    <div id="login" className="page">
      <div className="header">Login</div>
      <div className="form-container">
        {error.length > 0 && <div className="error">{error}</div>}
        <Form
          handleSubmit={async (formVals) => {
            await handleLogin(formVals, setError)
            history.push("/home")
          }}
          form={emptyForm}
        />
        <Link to="/signup">Create New Account</Link>
      </div>
    </div>
  )
}

export default Login
