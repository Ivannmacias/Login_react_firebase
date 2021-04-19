import React from 'react'
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Navbar from './components/Navbar'



import Login from './components/Login'

const  App = () => {
  return (
    <Router>
      <div className="container">
      <h2>Navbar</h2>
      <Navbar></Navbar>

        <Switch>
        <Route path="/" exact>
            Inicio
          </Route>
          <Route path="/login">
          <Login></Login>
          </Route>
          <Route path="/admin">
            Registro
          </Route>
          
        </Switch>
        </div>
    </Router>
  );
}

export default App;
