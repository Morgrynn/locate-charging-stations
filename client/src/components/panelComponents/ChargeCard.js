import React from 'react';
import styles from '../styles/AddressCard.module.css';

export default function ChargeCard({ location }) {
  let a = location.Connections.ConnectType1;
  let b = location.Connections.ConnectType2;
  let c = location.Connections.ConnectType3;
  let d = location.Connections.ConnectType4;

  return (
    <div className={styles.container}>
      <ol className={styles.chargelist}>
        <p>Charge & Drive</p>
        <li>
          Charge: {a.charge} {a.available ? 'Available' : 'In use'}
        </li>
        <li>
          Charge: {b.charge} {b.available ? 'Available' : 'In use'}
        </li>
        <li>
          Charge: {c.charge} {c.available ? 'Available' : 'In use'}
        </li>
        <li>
          Charge: {d.charge} {d.available ? 'Available' : 'In use'}
        </li>
      </ol>
    </div>
  );
}
