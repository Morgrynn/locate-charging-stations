import React from 'react';
import styles from '../styles/ChargeVehicle.module.css';

export default function Type4({ station, handleChargeType, username }) {
  let availableStyles;
  let notice;
  let d = station.Connections.ConnectType4.available;

  availableStyles = d ? styles.item : styles.unavailable;
  notice = d ? styles.noNotice : styles.notice;
  return (
    <div
      className={availableStyles}
      onClick={() =>
        handleChargeType(
          station.Connections.ConnectType4.code,
          station.Connections.ConnectType4.cent,
          station.Connections.ConnectType4.power,
          username,
          station
        )
      }>
      <div className={styles.bottomleft}>
        <div className={styles.chargetype}>
          <h3>Plug & Charge</h3>
          <p>{station.Connections.ConnectType4.type}</p>
          <div className={styles.image}>
            <img src={'/fast.png'} alt='fast plug' />
          </div>
        </div>
        <div className={styles.code}>
          Code to activate charger:{' '}
          <strong>{station.Connections.ConnectType4.code}</strong>
        </div>
        <div className={styles.chargeinfo}>
          <p>
            Charge speed is:{' '}
            {station.Connections.ConnectType4.speed.toUpperCase()}
          </p>
          <p>This has a {station.Connections.ConnectType4.charge} charge</p>
          <p>Costs: {station.Connections.ConnectType4.price}</p>
          <p className={notice}>Unavailable</p>
        </div>
      </div>
    </div>
  );
}
