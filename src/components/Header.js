import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"

import { UserContext } from "../context"
import ProfileIcon from "./utils/ProfileIcon"
import "../styles/Header.css"

const Header = () => {
  const history = useHistory()
  const { user } = useContext(UserContext)

  const renderPageTitle = () => {
    switch (history.location.pathname) {
      case "/home":
        return "Chats"
      case "/home/friends":
        return "Friends"
      default:
        return "Search"
    }
  }

  return (
    <div className="nav">
      <Link to="/account">
        <ProfileIcon username={user.username} />
      </Link>
      <div id="page-title">{history ? renderPageTitle() : null}</div>
    </div>
  )
}

export default Header
