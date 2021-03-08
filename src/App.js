import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import UserContext from './context/UserContext'
import SocketContext from './context/SocketContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Room from './pages/Room'

function App() {

  const url = "https://text-app-backend.herokuapp.com"
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)
  const userValue = { user, setUser }
  const socketValue = { socket, setSocket }

  const handleUser = user => {
    setUser(user)
  }

  return (
    <UserContext.Provider value={userValue}>
      <SocketContext.Provider value={socketValue}>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={rp => <Login {...rp} url={url} handleUser={handleUser} />}
            />
            <Route
              path="/signup"
              render={rp => <Signup {...rp} url={url} />}
            />
            <Route
              path="/home"
              render={rp => <Home {...rp} url={url} handleUser={handleUser} user={user} />}
            />
            <Route
              path="/room/:id"
              render={rp => <Room {...rp} url={url} user={user} />}
            />
          </Switch>
        </div>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
