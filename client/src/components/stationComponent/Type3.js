import React from 'react';
import styles from '../styles/ChargeVehicle.module.css';

export default function Type3({ station, handleChargeType, username }) {
  return (
    <div
      className={styles.item}
      onClick={() =>
        handleChargeType(
          station.Connections.ConnectType3.code,
          station.Connections.ConnectType3.cent,
          station.Connections.ConnectType3.power,
          username,
          station
        )
      }>
      <div className={styles.bottomleft}>
        <div className={styles.chargetype}>
          <h3>Plug & Charge</h3>
          <p>{station.Connections.ConnectType3.type}</p>
          <div className={styles.image}>
            <img src={'/fast.png'} alt='fast plug' />
          </div>
        </div>
        <div className={styles.code}>
          Code to activate charger:{' '}
          <strong>{station.Connections.ConnectType3.code}</strong>
        </div>
        <div className={styles.chargeinfo}>
          <p>
            Charge speed is:{' '}
            {station.Connections.ConnectType3.speed.toUpperCase()}
          </p>
          <p>This has a {station.Connections.ConnectType3.charge} charge</p>
          <p>Costs: {station.Connections.ConnectType3.price}</p>
        </div>
      </div>
    </div>
  );
}
