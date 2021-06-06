import React, { useContext, useEffect } from "react"
import { Route, Switch } from "react-router-dom"

import { refreshUser } from "../api/user"
import { UserContext, SocketContext, HistoryContext } from "../context"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Search from "./Search"
import Chats from "./Chats"
import Friends from "./Friends"
import Loading from "../components/Loading"
import "../styles/Home.css"

const Home = (props) => {
  const { user, setUser } = useContext(UserContext)
  const { socket } = useContext(SocketContext)
  const { setHistory, history } = useContext(HistoryContext)

  useEffect(() => {
    if (!user || !socket) {
      props.history.push("/")
    } else {
      setHistory(props.history)
      socket.on("refresh", () => refreshUser(user, setUser))
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

  return history ? loaded() : loading()
}

export default Home
