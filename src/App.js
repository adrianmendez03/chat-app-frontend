import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import UserContext from './context/UserContext'
import SocketContext from './context/SocketContext'
import UrlContext from './context/UrlContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Room from './pages/Room'
import User from './pages/User'

function App() {

  const refreshUser = async (id) => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    const response = await fetch(`https://text-app-backend.herokuapp.com/users/${id}`, {
      method: 'get',
      headers: { Authorization: `Bearer ${token}`}
    })
    const data = await response.json()
    setUser(data)
  }

  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)
  const userValue = { user, setUser, refreshUser }
  const socketValue = { socket, setSocket }

  const handleUser = user => {
    setUser(user)
  }

  return (
    <UserContext.Provider value={userValue}>
      <SocketContext.Provider value={socketValue}>
        <UrlContext.Provider value={{url: "https://text-app-backend.herokuapp.com"}}>
          <div className="app">
            <Switch>
              <Route
                exact
                path="/"
                render={rp => <Login {...rp} />}
              />
              <Route
                path="/signup"
                render={rp => <Signup {...rp} />}
              />
              <Route
                path="/home"
                render={rp => <Home {...rp} />}
              />
              <Route
                path="/message/:friendId"
                render={rp => <Room {...rp} />}
              />
              <Route
                path="/room/:roomId"
                render={rp => <Room {...rp} />}
              />
              <Route
                path="/user/:id"
                render={rp => <User {...rp} />}
              />
            </Switch>
          </div>
        </UrlContext.Provider>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
