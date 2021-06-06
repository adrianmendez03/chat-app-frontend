import React, { useContext, useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"

import { refreshUser } from "../api/user"
import { UserContext, SocketContext } from "../context"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Search from "./Search"
import Chats from "./Chats"
import Friends from "./Friends"
import Loading from "../components/Loading"
import "../styles/Home.css"

const Home = (props) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const history = useHistory()
  const { user, setUser } = useContext(UserContext)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    if (!token) {
      props.history.push("/")
    } else {
      refreshUser(setUser)
    }
  })

  const loading = () => <Loading />
  const loaded = () => {
    return (
      <>
        <Header />
        <div id="home">
          <Switch>
            <Route exact path="/home" render={(rp) => <Chats {...rp} />} />
            <Route path="/home/search" render={(rp) => <Search {...rp} />} />
            <Route
              path="/home/friends"
              render={(rp) => <Friends user={user} {...rp} />}
            />
          </Switch>
        </div>
        <Footer />
      </>
    )
  }

  return <div></div>
}

export default Home
