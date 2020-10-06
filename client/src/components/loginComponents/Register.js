import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';
import constants from '../../constants.json';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

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
        withCredentials: true,
      }).then((res) => console.log('Registered Successfully'));
    } catch (error) {
      return console.log(error, 'There was an error registering!');
    }
  };

  return (
    <div className={styles.mainContainer}>
      Registration<Link to='/login'>Back</Link>
      <div className={styles.responsive}>
        <div className={styles.container}>
          <div className={styles.textMono}>Join LocalCharge</div>
          <h1 className={styles.h1}>Create your account</h1>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.regForm} onSubmit={register}>
            <input
              className={styles.input}
              type='text'
              placeholder='Enter Username'
              name='username'
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              className={styles.input}
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button className={styles.button} type='submit'>
              Register!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
