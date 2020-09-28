import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Map from './components/Map';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Map}>
          <Map />
        </Route>
        <Route exact path='/login' component={Login}>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
