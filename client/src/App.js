import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
import ChargeVehicle from './components/ChargeVehicle';

export default function App() {
  const [usersData, setUsersData] = useState([]);
  const [data, setData] = useState([]);
  const [moreData, setMoreData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // `https://api.openchargemap.io/v3/poi/?output=json&countrycode=FI&maxresults=20`
  useEffect(() => {
    axios.get(`${constants.baseUrl}/charger/locations`).then((response) => {
      console.log('Charger Data: ', response.data);
      setData(response.data);
    });
    getMoreLocations();
  }, []);

  const getMoreLocations = () => {
    axios
      .get(`${constants.baseUrl}/charger/more-locations`)
      .then((response) => {
        console.log('More Data: ', response.data);
        setMoreData(response.data);
      });
  };

  const checkLoginStatus = () => {};

  const getUsername = (event) => {
    setLoginUsername(event.target.value);
  };

  const getPassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const onLogin = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
  };

  const onLoginFail = () => {
    setIsAuthenticated(isAuthenticated);
    console.log('Login failed!');
  };

  const onSearch = (event) => {
    event.preventDefault();
    setSearchLocation(event.target.value);
  };

  // OnClick for button in sidepanel
  const goToCharge = () => {
    // check if user is logged in
    if (isAuthenticated) {
      // console.log(isAuthenticated);

      return (
        <ProtectedRoute
          path='/map-view'
          isAuthenticated={isAuthenticated}
          exact
          render={(routeProps) => <ChargeVehicle data={data} {...routeProps} />}
        />
      );
    }
    // if user is logged in redirect to charging page who is the user

    // else redirect to login
    console.log('Go to charge');
  };

  const loadProtectedData = () => {
    axios
      .get(`${constants.baseUrl}/users/protected-users`, Auth.getAxiosAuth())
      .then((results) => {
        console.log(results);
      });
  };

  return (
    <div style={{ height: '100%' }}>
      <Header isLoggedIn={isAuthenticated} />
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => (
            <ChargerLocations
              data={data}
              moreData={moreData}
              onSearch={onSearch}
              charge={goToCharge}
              searchLocation={searchLocation}
              isAuthenticated={isAuthenticated}
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
              getUsername={getUsername}
              getPassword={getPassword}
              username={loginUsername}
              password={loginPassword}
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
          render={(routeProps) => <ChargeVehicle data={data} {...routeProps} />}
        />
        <Route exact path='/login/password-reset' component={ResetPassword} />
        <Route exact path='/users/register' component={Register} />
        <Route
          exact
          path='/charge-vehicle'
          render={(routeProps) => <ChargeVehicle />}
        />
      </Switch>
    </div>
  );
}
