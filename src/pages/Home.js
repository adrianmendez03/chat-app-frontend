import React, { useContext, useEffect } from "react"
import { Route, Switch } from "react-router-dom"

import { updateUser } from "../api/user"
import { UserContext } from "../context"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Search from "./Search"
import Chats from "./Chats"
import Friends from "./Friends"
import Loading from "../components/utils/Loading"
import "../styles/Home.css"

const Home = (props) => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (!token) {
      props.history.push("/")
    } else {
      updateUser(setUser)
    }
  }, [token, props.history, setUser])

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
