import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "../styles/Signup.css"

import { handleSignup } from "../api/user"
import Form from "../components/Form"

const Signup = (props) => {
  const history = useHistory()
  const emptyForm = {
    email: "",
    password: "",
    username: "",
  }

  const [errorMessage, setErrorMessage] = useState("")

  const makeApiCall = async (formVals) => {
    const response = await handleSignup(formVals)
    if (response.message === "User created.") {
      history.push("/")
    } else {
      setErrorMessage(response.errors[0].message)
    }
  }

  const validateInputs = (formVals) => {
    setErrorMessage("")

    // Really basic regex validation:
    // Email validates basic structure -> _@_._
    // Password validates password length greater than 8 and if it contains an uppercase and lowercase letter and a number
    const emailValidation = new RegExp(/\S+@\S+\.\S+/)
    const passwordValidation = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    )

    if (!emailValidation.test(formVals.email)) {
      setErrorMessage("Enter a valid email")
    } else if (!passwordValidation.test(formVals.password)) {
      setErrorMessage(
        "Password should be at least 8 characters long and contain a lowercase and uppercase letter, and a number."
      )
    } else {
      makeApiCall(formVals)
    }
  }

  return (
    <div id="signup" className="page">
      <div className="header">Signup</div>
      <div className="form-container">
        {errorMessage.length > 0 && errorMessage}
        <Form handleSubmit={validateInputs} form={emptyForm} />
        <Link to="/">Login</Link>
      </div>
    </div>
  )
}

export default Signup
