import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Login from './components/loginComponents/Login';
import constants from './constants.json';
import Register from './components/loginComponents/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ChargerLocations from './components/mapComponents/ChargerLocations';
import ChargeVehicle from './components/ChargeVehicle';
import History from './components/stationComponent/History';

export default function App() {
  const [data, setData] = useState([]);
  const [moreData, setMoreData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [clickedStation, setClickedStation] = useState([]);
  const [chargeCode, setChargeCode] = useState('');
  const [warning, setWarning] = useState();
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [cent, setCent] = useState(0);
  const [power, setPower] = useState(0);
  const [uname, setUname] = useState('');
  const [address, setAddress] = useState('');
  const [chargeTime, setChargeTime] = useState('0');
  const [chargeCost, setChargeCost] = useState('0');
  const [userHistory, setUserHistory] = useState([]);
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios.get(`${constants.baseUrl}/charger/station1`).then((response) => {
      // console.log('Charger Data: ', response.data);
      setData(response.data);
    });
    getMoreLocations();
  }, []);

  const getMoreLocations = () => {
    axios.get(`${constants.baseUrl}/charger/station2`).then((response) => {
      // console.log('More Data: ', response.data);
      setMoreData(response.data);
    });
  };

  const getUsername = (event) => {
    setLoginUsername(event.target.value);
  };

  const getPassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const getRegUsername = (event) => {
    setRegisterUsername(event.target.value);
  };

  const getRegPassword = (event) => {
    setRegisterPassword(event.target.value);
  };

  const getRegEmail = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onLogin = () => {
    setIsAuthenticated(true);
    setLoginStatus(loginUsername);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setLoginUsername('');
    setLoginPassword('');
  };

  const onSearch = (event) => {
    event.preventDefault();
    setSearchLocation(event.target.value);
  };

  // Quick fix to handle input errors for reg and login forms
  useEffect(() => {
    let interval = null;
    if (isError) {
      interval = setInterval(() => {
        setIsError(false);
      }, 1200);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isError]);

  // -------------------------------------------
  // Timer functions
  const startTimer = () => {
    setTimerOn(true);
    setTimerTime(timerTime);
    setTimerStart(Date.now() - timerTime);
  };

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTimerTime(Date.now() - timerStart);
      });
    } else if (!timerOn && timerStart !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn, timerStart]);

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setTimerStart(0);
    setTimerTime(0);
    setTimerOn(false);
    setChargeCode('');
  };

  // -------------------------------------------

  // Get data from ChargerLocations
  // this is a callback function to access data from child to parent component
  const getLocationId = (childData) => {
    setClickedStation(childData);
  };

  // OnClick Choose Charger Type
  const handleChargeType = (input, power, cent, username, station) => {
    setChargeCode(input);
    setPower(power);
    setCent(cent);
    setUname(username);
    setAddress(station);
    setWarning({ color: 'black' });
  };

  // Get date for userhistory page
  // this is a callback function to access data from child to parent component
  const getHistoryInforation = (chargeTime, chargeCost) => {
    setChargeTime(chargeTime);
    setChargeCost(chargeCost);
  };

  // OnChange event updates value for input
  const updateCodeValue = (event) => {
    event.preventDefault();
    setChargeCode(event);
  };

  // Switch to choose what charge user wants to use
  const startCharge = (event) => {
    event.preventDefault();
    switch (chargeCode) {
      case 'A4CV':
        console.log('Charge is 22kw. Cost is 0.00€');
        startTimer();
        break;
      case 'A5CV':
        console.log('Charge is 22kw. Cost is 0.20€/min');
        startTimer();
        break;
      case 'A6CV':
        console.log('Charge is 50-150kw. Cost is 18c/kWh');
        startTimer();
        break;
      case 'A8CV':
        console.log('Charge is 50-150kw. Cost is 18c/kWh');
        startTimer();
        break;
      default:
        setWarning({ color: 'red' });
    }
  };

  // POST to database
  const postHistory = () => {
    axios
      .post(`${constants.baseUrl}/users/history`, {
        username: uname,
        address:
          address.AddressInfo.title +
          address.AddressInfo.line +
          address.AddressInfo.postcode +
          address.AddressInfo.town,
        lengthChargeTime: chargeTime,
        chargeCost: chargeCost,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GET user history from database
  const prevCharges = () => {
    axios({
      url: `${constants.baseUrl}/users/history/${loginUsername}`,
      method: 'get',
      auth: {
        username: loginUsername,
        password: loginPassword,
      },
    })
      .then((res) => {
        // console.log(res);
        setUserHistory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // OnClick for button in sidepanel
  const goToCharge = () => {
    console.log('stationId = ', clickedStation);
    if (isAuthenticated) {
      return history.push('/station');
    } else {
      return history.push('/users/login');
    }
  };

  // POST to database
  const login = async (event) => {
    event.preventDefault();
    try {
      await axios({
        url: '/users/login',
        method: 'post',
        baseURL: `${constants.baseUrl}`,
        auth: {
          username: loginUsername,
          password: loginPassword,
        },
      }).then((response) => {
        console.log('CLIENT login res ->', response);
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        setIsError(false);
        onLogin();
        prevCharges();
        history.push('/station');
      });
    } catch (error) {
      setIsError(true);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('data ', error.response.data);
        console.log('status ', error.response.status);
        console.log('header ', error.response.headers);
        console.log('CLIENT login error -> not registered');
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('request ', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log('config ', error.config);
      // return console.log(error, 'CLIENT There was an error registering!');
    }
  };

  // POST to database
  const register = async (event) => {
    event.preventDefault();
    try {
      await axios({
        url: '/users/register',
        method: 'post',
        baseURL: `${constants.baseUrl}`,
        data: {
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        },
      }).then((res) => {
        console.log('Client register res -> ', res);
        console.log('Registered Successfully');
        setIsError(false);
        history.push('/users/login');
      });
    } catch (error) {
      setIsError(true);
      return console.log(error, 'There was an error registering!');
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Header
        isLoggedIn={isAuthenticated}
        loginStatus={loginStatus}
        onLogout={onLogout}
      />
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
              parentCallback={getLocationId}
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
              login={login}
              logout={onLogout}
              loginSuccess={onLogin}
              getUsername={getUsername}
              getPassword={getPassword}
              isAuthenticated={isAuthenticated}
              isError={isError}
              {...routeProps}
            />
          )}
        />
        <ProtectedRoute
          path='/station'
          isAuthenticated={isAuthenticated}
          exact
          render={(routeProps) => (
            <ChargeVehicle
              username={loginUsername}
              handleChargeType={handleChargeType}
              chargeCode={chargeCode}
              updateCodeValue={updateCodeValue}
              startCharge={startCharge}
              station={clickedStation}
              warning={warning}
              startTimer={startTimer}
              stopTimer={stopTimer}
              resetTimer={resetTimer}
              timerOn={timerOn}
              timerStart={timerStart}
              timerTime={timerTime}
              cent={cent}
              power={power}
              parentCallback={getHistoryInforation}
              postHistory={postHistory}
              {...routeProps}
            />
          )}
        />
        <ProtectedRoute
          path='/users'
          exact
          isAuthenticated={isAuthenticated}
          component={Login}
        />
        <ProtectedRoute
          path='/users/history'
          exact
          isAuthenticated={isAuthenticated}
          render={(props) => <History {...props} userHistory={userHistory} />}
        />
        <Route
          exact
          path='/users/register'
          render={(props) => (
            <Register
              {...props}
              register={register}
              getRegEmail={getRegEmail}
              getRegPassword={getRegPassword}
              getRegUsername={getRegUsername}
              isError={isError}
            />
          )}
        />
      </Switch>
    </div>
  );
}
