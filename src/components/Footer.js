import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import "../styles/Footer.css"

const Footer = (props) => {
  const history = useHistory()
  const { pathname } = history.location
  const [colors, setColors] = useState({
    home: "cornflower",
    friends: "gray",
  })

  useEffect(() => {
    if (pathname) {
      if (pathname === "/home") {
        setColors({ home: "cornflowerblue", friends: "gray" })
      } else if (pathname === "/home/friends") {
        setColors({ home: "gray", friends: "cornflowerblue" })
      } else {
        setColors({ home: "gray", friends: "gray" })
      }
    }
  }, [pathname])

  return (
    <div className="footer">
      <Link to="/home">
        <i style={{ color: colors.home }} className="fas fa-comments"></i>
      </Link>
      <Link to="/home/friends">
        <i
          style={{ color: colors.friends }}
          className="fas fa-user-friends"
        ></i>
      </Link>
    </div>
  )
}

export default Footer
