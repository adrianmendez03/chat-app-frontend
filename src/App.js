import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import './App.css'

import UserContext from './context/UserContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Room from './pages/Room'

const socket = io.connect('http://localhost:4000')

function App() {

  const url = "https://text-app-backend.herokuapp.com"
  const [user, setUser] = useState(null)
  const value = { user, setUser }

  const handleUser = user => {
    setUser(user)
  }

  return (
    <UserContext.Provider value={value}>
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
            render={rp => <Home {...rp} url={url} handleUser={handleUser} user={user} socket={socket} />}
          />
          <Route
            path="/room/:id"
            render={rp => <Room {...rp} url={url} user={user} socket={socket} />}
          />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
