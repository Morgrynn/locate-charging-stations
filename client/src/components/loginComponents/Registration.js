import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';

export default function Registration() {
  return (
    <div className={styles.mainContainer}>
      Registration<Link to='/login'>Back</Link>
      <div className={styles.responsive}>
        <div className={styles.container}>
          <div className={styles.textMono}>Join LocalCharge</div>
          <h1 className={styles.h1}>Create your account</h1>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.regForm}>
            <input
              className={styles.input}
              type='text'
              placeholder='Enter Username'
              name='username'
            />
            <input
              className={styles.input}
              type='email'
              placeholder='Enter Email'
              name='email'
            />
            <input
              className={styles.input}
              type='password'
              placeholder='Enter password'
              name='password'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
