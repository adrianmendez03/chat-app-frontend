import React from "react"
import { Link, useHistory } from "react-router-dom"

import ProfileIcon from "./utils/ProfileIcon"
import "../styles/Header.css"

const Header = () => {
  const history = useHistory()

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
        <ProfileIcon />
      </Link>
      <div id="page-title">{history ? renderPageTitle() : null}</div>
    </div>
  )
}

export default Header
