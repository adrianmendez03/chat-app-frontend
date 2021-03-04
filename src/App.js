import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const url = "https://text-app-backend.herokuapp.com"

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={rp => <Login {...rp} url={url} />}
        />
        <Route
          path="/signup"
          render={rp => <Signup {...rp} url={url}/>}
        />
      </Switch>
    </div>
  );
}

export default App;
