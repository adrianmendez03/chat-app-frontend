import React from "react"
import { Link } from "react-router-dom"

import Backpage from "../utils/Backpage"
import ProfileIcon from "../utils/ProfileIcon"
import Loading from "../utils/Loading"

const Header = (props) => {
  const { friend } = props

  const loading = () => <Loading />
  const loaded = () => {
    return (
      <>
        <div id="chatnav" className="nav">
          <Backpage location={"/home"} />
          <Link to={`/user/${friend.id}`} className="profile-container">
            <ProfileIcon username={friend.username} personId={friend.id} />
            {friend.username}
          </Link>
        </div>
      </>
    )
  }

  return friend ? loaded() : loading()
}

export default Header
