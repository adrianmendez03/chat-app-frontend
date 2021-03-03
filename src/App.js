import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/Login'

function App() {

  const url = "https://text-app-backend.herokuapp.com"

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={rp => <Login url={url} />}
        />
      </Switch>
    </div>
  );
}

export default App;
