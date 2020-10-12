import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, loginStatus, onLogout }) {
  let output;
  if (isLoggedIn) {
    output = (
      <nav>
        <ul className={styles.list}>
          <Link to='/' className={styles.active}>
            Locate Charging Station
          </Link>
          <div />
          <Link to='/' className={styles.active} onClick={onLogout}>
            Logout {loginStatus.toUpperCase()}
          </Link>
        </ul>
      </nav>
    );
  } else {
    output = (
      <nav>
        <ul className={styles.list}>
          <Link to='/' className={styles.active}>
            Locate Charging Station
          </Link>
          <div />
          <Link to='/users/login' className={styles.active}>
            Login
          </Link>
        </ul>
      </nav>
    );
  }

  return <div className={styles.navbar}>{output}</div>;
}
