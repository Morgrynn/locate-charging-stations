import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
    <div>
      <p className={styles.loginCallout}>
        New to LocalCharge?
        <Link className={styles.link} to='/registration'>
          Create an account
        </Link>
        .
      </p>
    </div>
  );
}
