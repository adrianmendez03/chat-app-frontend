import React from "react"
import { Link } from "react-router-dom"
import "../styles/Signup.css"

import { handleSignup } from "../api/user"
import Form from "../components/Form"

const Signup = (props) => {
  const emptyForm = {
    email: "",
    password: "",
    username: "",
  }

  return (
    <div id="signup" className="page">
      <div className="header">Signup</div>
      <div className="form-container">
        <Form handleSubmit={handleSignup} form={emptyForm} />
        <Link to="/">Login</Link>
      </div>
    </div>
  )
}

export default Signup
