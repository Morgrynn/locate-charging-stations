import React from 'react';
import styles from '../styles/AddressCard.module.css';

export default function PriceCard({ location }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>Payment Required</li>
        <li>
          {location.Connections.ConnectType1.type}{' '}
          {location.Connections.ConnectType1.price},{' '}
          {location.Connections.ConnectType1.charge}
        </li>
      </ul>
    </div>
  );
}
