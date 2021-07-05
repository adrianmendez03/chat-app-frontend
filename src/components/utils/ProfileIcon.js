import React from "react"

import "../../styles/Profile.css"

const ProfileIcon = (props) => {
  const { display, username } = props

  return (
    <div className="profile" style={display}>
      {username && username[0]}
      <div className="online-outer">
        <div className="online-inner" style={{ background: "red" }}></div>
      </div>
    </div>
  )
}

export default ProfileIcon
