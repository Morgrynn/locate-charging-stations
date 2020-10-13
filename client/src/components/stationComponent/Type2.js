import React from 'react';
import styles from '../styles/ChargeVehicle.module.css';

export default function Type2({ station, handleChargeType, username }) {
  let availableStyles;
  let notice;
  let b = station.Connections.ConnectType2.available;

  availableStyles = b ? styles.item : styles.unavailable;
  notice = b ? styles.noNotice : styles.notice;
  return (
    <div
      className={availableStyles}
      onClick={() =>
        handleChargeType(
          station.Connections.ConnectType2.code,
          station.Connections.ConnectType2.cent,
          station.Connections.ConnectType2.power,
          username,
          station
        )
      }>
      <div className={styles.bottomleft}>
        <div className={styles.chargetype}>
          <h3>Plug & Charge</h3>
          <p>{station.Connections.ConnectType2.type}</p>
          <div className={styles.image}>
            <img src={'/type2.png'} alt='slow plug' />
          </div>
        </div>
        <div className={styles.code}>
          Code to activate charger:{' '}
          <strong>{station.Connections.ConnectType2.code}</strong>
        </div>
        <div className={styles.chargeinfo}>
          <p>
            Charge speed is:{' '}
            {station.Connections.ConnectType2.speed.toUpperCase()}
          </p>
          <p>This has a {station.Connections.ConnectType2.charge} charge</p>
          <p>Costs: {station.Connections.ConnectType2.price}</p>
          <p className={notice}>Unavailable</p>
        </div>
      </div>
    </div>
  );
}
