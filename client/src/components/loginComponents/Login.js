import React from 'react';
import styles from './Login.module.css';
import Auth from '../Auth';
import imgIcon from '../../images/Electric.png';
import { Link } from 'react-router-dom';
import Button from '../Button';

// User login system which authenticates and authorizes users to access the system
// TODO
// make this a modal
// link to back end
export default function Login() {
  // function submitLogin(event) {
  //   event.preventDefault();
  //   Auth.authenticate(
  //     event.target['username'].value,
  //     event.target['password'].value
  //   ).then((result) => {
  //     console.log(result);
  //   });
  // }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div>
          <img className={styles.img} src={imgIcon} alt='Electric Charger' />
        </div>
        <div className={styles.authForm}>
          <form className={styles.form}>
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
            <Link className={styles.linktwo} to='/registration'>
              Create an account
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
