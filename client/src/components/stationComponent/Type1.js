import React from 'react';
import styles from '../styles/ChargeVehicle.module.css';

export default function Type1({ station, handleChargeType, username }) {
  return (
    <div
      className={styles.item}
      onClick={() =>
        handleChargeType(
          station.Connections.ConnectType1.code,
          station.Connections.ConnectType1.cent,
          station.Connections.ConnectType1.power,
          username,
          station
        )
      }>
      <div className={styles.bottomleft}>
        <div className={styles.chargetype}>
          <h3>Plug & Charge</h3>
          <p>{station.Connections.ConnectType1.type}</p>
          <div className={styles.image}>
            <img src={'/type2.png'} alt='slow plug' />
          </div>
        </div>
        <div className={styles.code}>
          Code to activate charger:{' '}
          <strong>{station.Connections.ConnectType1.code}</strong>
        </div>
        <div className={styles.chargeinfo}>
          <p>
            Charge speed is:{' '}
            {station.Connections.ConnectType1.speed.toUpperCase()}
          </p>
          <p>This has a {station.Connections.ConnectType1.charge} charge</p>
          <p>Costs: {station.Connections.ConnectType1.price}</p>
        </div>
      </div>
    </div>
  );
}
