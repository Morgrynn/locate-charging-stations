import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.list}>
          <Link to='/' className={styles.active}>
            Locate Charging Station
          </Link>
          <Link to='/users/login'>Login</Link>
        </ul>
      </nav>
    </div>
  );
}
