import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import RenderMap from './components/RenderMap';
import Login from './components/loginComponents/Login';
import constants from './constants.json';
import ResetPassword from './components/loginComponents/ResetPassword';
import Registration from './components/loginComponents/Registration';

export default function App() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios.get(`${constants.baseUrl}/users`).then((response) => {
  //     console.log(response.data.users);
  //     setUsers(response.data.users);
  //   });
  // }, []);
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={RenderMap} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/login/password-reset' component={ResetPassword} />
        <Route exact path='/registration' component={Registration} />
      </Switch>
    </div>
  );
}
