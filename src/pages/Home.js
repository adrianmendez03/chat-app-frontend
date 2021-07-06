import React, { useContext, useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { io } from "socket.io-client"

import { updateUser, connectUser } from "../api/user"
import { SocketContext, UserContext } from "../context"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Search from "./Search"
import Chats from "./Chats"
import Friends from "./Friends"
import Loading from "../components/utils/Loading"
import "../styles/Home.css"

const Home = (props) => {
  const history = useHistory()
  const token = JSON.parse(window.localStorage.getItem("token"))
  const { user, setUser } = useContext(UserContext)
  const { socket, setSocket } = useContext(SocketContext)

  useEffect(() => {
    if (!token) {
      history.push("/")
    } else {
      const makeApiCalls = async () => {
        updateUser(setUser, setSocket)
      }
      makeApiCalls()
    }
  }, [token])

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

  return user ? loaded() : loading()
}

export default Home
