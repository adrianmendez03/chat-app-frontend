import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"

import { UserContext, SocketContext } from "../context"
import ProfileIcon from "../components/utils/ProfileIcon"
import Backpage from "../components/utils/Backpage"
import Loading from "../components/utils/Loading"
import "../styles/User.css"

const Account = () => {
  const history = useHistory()
  const { socket, setSocket } = useContext(SocketContext)
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem("token")
    setUser(null)
    socket.disconnect()
    setSocket(null)
    history.push("/")
  }

  const loading = () => <Loading />
  const loaded = () => {
    const { username, id } = user

    return (
      <div id="user" className="page">
        <Backpage location={"/home"} />
        <ProfileIcon username={username} personId={id} />
        <div className="username">{username}</div>
        <div className="container">
          <div className="option">
            <div className="icon">
              <i className="fas fa-moon"></i>
            </div>
            <div className="content">Dark Mode</div>
          </div>
          <div className="option" onClick={() => history.push("/home/friends")}>
            <div className="icon">
              {user && Object.keys(user.requests).length}
            </div>
            <div className="content">Message Requests</div>
          </div>
        </div>
        <div className="container">
          <div className="title">Account</div>
          <div className="option">
            <div className="icon">
              <i className="fas fa-user-edit"></i>
            </div>
            <Link to="/account/edit" className="content">
              Edit
            </Link>
          </div>
          <div className="option" onClick={handleLogout}>
            <div className="icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="content">Logout</div>
          </div>
          <div className="option">
            <div className="icon">
              <i className="fas fa-trash-alt"></i>
            </div>
            <div className="content">Delete</div>
          </div>
        </div>
      </div>
    )
  }

  return user ? loaded() : loading()
}

export default Account
