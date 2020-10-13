import React from 'react';
import styles from '../styles/History.module.css';
import { Link } from 'react-router-dom';

export default function History({ userHistory }) {
  return (
    <div>
      <div className={styles.title}>
        Charging History
        <div className={styles.buttonLink}>
          <Link to='/station'>Go back</Link>
        </div>
      </div>
      <div className={styles.div}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Cost</th>
              <th className={styles.th}>How long you charged</th>
            </tr>
          </thead>
          <tbody>
            {userHistory.map((data, index) => {
              return (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>{data.address}</td>
                  <td className={styles.td}>{data.chargeDate}</td>
                  <td className={styles.td}>{data.chargeCost}</td>
                  <td className={styles.td}>{data.lengthChargeTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
