import React from 'react';
import styles from './Login.module.css';

// User login system which authenticates and authorizes users to access the system
// TODO
// make this a modal
// link to back end
export default function Login() {
  return (
    <form>
      <div className={styles.container}>
        <div>
          <label>Username</label>
          <input type='text' placeholder='Enter Username' name='username' />
        </div>
        <div>
          <label>Password</label>
          <input type='password' placeholder='Enter Password' name='password' />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </div>
      {/* <div className='container'>
        <button type='button' class='cancelbtn'>
          Cancel
        </button>
        <span className='password'>
          Forgot <a href='#'>password?</a>
        </span>
      </div> */}
    </form>
  );
}
