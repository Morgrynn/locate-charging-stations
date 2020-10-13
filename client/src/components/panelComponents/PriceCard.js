import React from 'react';
import styles from '../styles/AddressCard.module.css';

export default function PriceCard({ location }) {
  let a = location.Connections.ConnectType1;
  let b = location.Connections.ConnectType2;
  let c = location.Connections.ConnectType3;
  let d = location.Connections.ConnectType4;
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>Payment Required</li>
        <li>
          <strong>{a.type}</strong> {a.price}, {a.charge}
        </li>
        <li>
          <strong>{b.type}</strong> {b.price}, {b.charge}
        </li>
        <li>
          <strong>{c.type}</strong> {c.price}, {c.charge}
        </li>
        <li>
          <strong>{d.type}</strong> {d.price}, {d.charge}
        </li>
      </ul>
    </div>
  );
}
