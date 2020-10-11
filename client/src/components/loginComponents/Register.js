import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register(props) {
  return (
    <div className={styles.mainContainer}>
      Registration<Link to='/login'>Back</Link>
      <div className={styles.responsive}>
        <div className={styles.container}>
          <div className={styles.textMono}>Join LocalCharge</div>
          <h1 className={styles.h1}>Create your account</h1>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.regForm} onSubmit={props.register}>
            <input
              className={styles.input}
              type='text'
              placeholder='Enter Username'
              name='username'
              onChange={props.getRegUsername}
            />
            <input
              className={styles.input}
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={props.getRegEmail}
            />
            <input
              className={styles.input}
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={props.getRegPassword}
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
