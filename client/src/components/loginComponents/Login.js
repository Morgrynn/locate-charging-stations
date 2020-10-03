import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import constants from '../../constants.json';
import imgIcon from '../../images/Electric.png';
import { Link, useHistory } from 'react-router-dom';

// TODO
// make this a modal

export default function Login(props) {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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
        withCredentials: true,
      }).then((res) => {
        console.log('Login successful');
        props.loginSuccess();
        props.history.push(props.redirectPathOnSuccess);
      });
    } catch (error) {
      return console.log(error, 'There was an error registering!');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div>
          <img className={styles.img} src={imgIcon} alt='Electric Charger' />
        </div>
        <div className={styles.authForm}>
          <form className={styles.form} onSubmit={login}>
            <div className={styles.authFormHeader}>
              <h1 className={styles.h1}>Sign in to LocalCharge</h1>
            </div>
            <div className={styles.authFormBody}>
              <div>
                <label className={styles.label}>Username</label>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='Enter Username'
                  name='username'
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div>
                <label className={styles.label}>
                  Password
                  <Link className={styles.linkone} to='/login/password-reset'>
                    Forgot password?
                  </Link>
                </label>
                <input
                  className={styles.input}
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  type='submit'
                  value='Sign in'
                  className={styles.button}
                />
              </div>
            </div>
          </form>
          <p className={styles.loginCallout}>
            New to LocalCharge?{' '}
            <Link className={styles.linktwo} to='/users/register'>
              Create an account
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
