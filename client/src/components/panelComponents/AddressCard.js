import React from 'react';
import styles from '../styles/AddressCard.module.css';

export default function AddressCard({ location }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>{location.AddressInfo.title}</li>
        <li>
          {location.AddressInfo.line}, {location.AddressInfo.postcode},{' '}
          {location.AddressInfo.town}
        </li>
      </ul>
    </div>
  );
}
