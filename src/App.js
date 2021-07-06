import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"

import { UserContext, SocketContext } from "./context"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Room from "./pages/Room"
import Account from "./pages/Account"
import Edit from "./pages/Edit"
import User from "./pages/User"

function App() {
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)
  const userValue = { user, setUser }
  const socketValue = { socket, setSocket }

  useEffect(() => {
    if (socket) {
      socket.on("newUser", (clients) => console.log(clients))
    }
  }, [socket])

  return (
    <UserContext.Provider value={userValue}>
      <SocketContext.Provider value={socketValue}>
        <div className="app">
          <Switch>
            <Route exact path="/" render={(rp) => <Login {...rp} />} />
            <Route path="/signup" render={(rp) => <Signup {...rp} />} />
            <Route path="/home" render={(rp) => <Home {...rp} />} />
            <Route
              path="/room/:roomId"
              render={(rp) => <Room socket={socket} {...rp} />}
            />
            <Route exact path="/account" render={(rp) => <Account {...rp} />} />
            <Route path="/account/edit" render={(rp) => <Edit {...rp} />} />
            <Route path="/user/:id" render={(rp) => <User {...rp} />} />
          </Switch>
        </div>
      </SocketContext.Provider>
    </UserContext.Provider>
  )
}

export default App
