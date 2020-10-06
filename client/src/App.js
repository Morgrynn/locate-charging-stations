import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Auth from './components/Auth';
import Header from './components/Header';
import Login from './components/loginComponents/Login';
import constants from './constants.json';
import ResetPassword from './components/loginComponents/ResetPassword';
import Register from './components/loginComponents/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ExampleprotectedView from './components/ExampleprotectedView';
import ChargerLocations from './components/mapComponents/ChargerLocations';

export default function App() {
  const [usersData, setUsersData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [locationDataSet, setLocationDataSet] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.openchargemap.io/v3/poi/?output=json&countrycode=FI&maxresults=20`
      )
      .then((response) => {
        console.log(response.data);
        setLocationDataSet(response.data);
      });
  }, []);

  const onLogin = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const onSearch = (event) => {
    // console.log(event.target.value);
    setSearchLocation(event.target.value);
  };

  const onLoginFail = () => {
    setIsAuthenticated(isAuthenticated);
    console.log('Login failed!');
  };

  const loadProtectedData = () => {
    axios
      .get(`${constants.baseUrl}/users/protected-users`, Auth.getAxiosAuth())
      .then((results) => {
        console.log(results);
      });
  };

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => (
            <ChargerLocations
              locationDataSet={locationDataSet}
              onSearch={onSearch}
              searchLocation={searchLocation}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path='/users/login'
          render={(routeProps) => (
            <Login
              loginSuccess={onLogin}
              loginFail={onLoginFail}
              userInformation={usersData}
              isAuthenticated={isAuthenticated}
              redirectPathOnSuccess='/map-view'
              {...routeProps}
            />
          )}
        />
        <ProtectedRoute
          path='/map-view'
          isAuthenticated={isAuthenticated}
          exact
          component={ExampleprotectedView}
          // render={(routeProps) => (
          //   <RenderMap
          //     loadProtectedData={loadProtectedData}
          //     someData={someData}
          //   />
          // )}
        />
        <Route exact path='/login/password-reset' component={ResetPassword} />
        <Route exact path='/users/register' component={Register} />
      </Switch>
    </div>
  );
}
