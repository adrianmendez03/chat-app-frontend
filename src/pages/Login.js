import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { handleLogin } from "../api/user"
import { UserContext, SocketContext } from "../context"
import Form from "../components/Form"
import "../styles/Login.css"

const Login = (props) => {
  const { user, setUser } = useContext(UserContext)
  const { setSocket } = useContext(SocketContext)
  const [error, setError] = useState("")
  const emptyForm = {
    email: "",
    password: "",
  }

  useEffect(() => {
    if (user) {
      props.history.push("/home")
    }
  }, [props, user])

  return (
    <div id="login" className="page">
      <div className="header">Login</div>
      <div className="form-container">
        {error.length > 0 && <div className="error">{error}</div>}
        <Form
          handleSubmit={(formVals) => {
            handleLogin(formVals, setUser, setSocket, setError)
          }}
          form={emptyForm}
        />
        <Link to="/signup">Create New Account</Link>
      </div>
    </div>
  )
}

export default Login
