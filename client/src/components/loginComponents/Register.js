import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Register.module.css';

export default function Register(props) {
  let error;
  error = props.isError ? styles.error : styles.input;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.responsive}>
        <div className={styles.container}>
          <div className={styles.textMono}>Join LocalCharge</div>
          <h1 className={styles.h1}>Create your account</h1>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.regForm} onSubmit={props.register}>
            <div className={styles.div}>
              <input
                className={error}
                type='text'
                placeholder='Enter Username'
                name='username'
                onChange={props.getRegUsername}
              />
              {props.isError && (
                <div className={styles.divError}>
                  Username minimum 4 characters long
                </div>
              )}
            </div>
            <div className={styles.div}>
              <input
                className={error}
                type='email'
                placeholder='Enter Email'
                name='email'
                onChange={props.getRegEmail}
              />
              {props.isError && (
                <div className={styles.divError}>Must have valid email</div>
              )}
            </div>
            <div className={styles.div}>
              <input
                className={error}
                type='password'
                placeholder='Enter password'
                name='password'
                onChange={props.getRegPassword}
              />
              {props.isError && (
                <div className={styles.divError}>
                  Password minimum 7 characters long
                </div>
              )}
            </div>
            <div className={styles.div}>
              <button className={styles.button} type='submit'>
                Register!
              </button>
              <div className={styles.buttonLink}>
                <Link to='/users/login'>Back</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
