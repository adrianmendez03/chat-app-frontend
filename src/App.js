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

function App() {

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
        <UrlContext.Provider value={{url: "https://text-app-backend.herokuapp.com"}}>
          <div className="app">
            <Switch>
              <Route
                exact
                path="/"
                render={rp => <Login {...rp} handleUser={handleUser} />}
              />
              <Route
                path="/signup"
                render={rp => <Signup {...rp} />}
              />
              <Route
                path="/home"
                render={rp => <Home {...rp} handleUser={handleUser} user={user} />}
              />
              <Route
                path="/room/:id"
                render={rp => <Room {...rp} user={user} />}
              />
            </Switch>
          </div>
        </UrlContext.Provider>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
