import React from 'react';
import styles from '../styles/AddressCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';

export default function ChargeCard({ charge }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <button className={styles.btn} onClick={charge}>
          Charge Vehicle <FontAwesomeIcon icon={faChargingStation} />
        </button>
      </ul>
    </div>
  );
}
