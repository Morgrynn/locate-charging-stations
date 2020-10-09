import React from 'react';
import styles from '../styles/AddressCard.module.css';

export default function ChargeCard({ location }) {
  let available;
  if (location.Connections.ConnectType1.available) {
    available = <li>Available to use</li>;
  } else {
    available = <li>In use</li>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>Charge & Drive</li>
        <li>
          {location.Connections.ConnectType1.type}{' '}
          {location.Connections.ConnectType1.speed} charge:{' '}
          {location.Connections.ConnectType1.charge}
        </li>
        {available}
      </ul>
    </div>
  );
}
