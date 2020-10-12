import React from 'react';
import styles from './Login.module.css';
import imgIcon from '../../images/Electric.png';
import { Link } from 'react-router-dom';

// TODO
// when login fails

export default function Login(props) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div>
          <img className={styles.img} src={imgIcon} alt='Electric Charger' />
        </div>
        <div className={styles.authForm}>
          <form className={styles.form} onSubmit={props.login}>
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
                  onChange={props.getUsername}
                />
              </div>
              <div>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  onChange={props.getPassword}
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
            <Link to='/users/register'>Create an account</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
