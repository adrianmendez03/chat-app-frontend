import React, { useContext } from "react"

import { UserContext } from "../context"
import "../styles/Profile.css"

const ProfileIcon = (props) => {
  const { display } = props
  const { user } = useContext(UserContext)

  return (
    <div className="profile" style={display}>
      {user.username[0]}
    </div>
  )
}

export default ProfileIcon
