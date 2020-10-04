import React from 'react';
import styles from './styles/SearchResult.module.css';

export default function SearchResult(props) {
  let value = props.searchLocation;
  return (
    <div className={styles.locationContainer}>
      {props.location.map((station, i) => {
        if (value.length > 0) {
          return (
            <li key={i} className={styles.listItem}>
              {station.AddressInfo.AddressLine1}
            </li>
          );
        }
        return <div key={i}></div>;
      })}
    </div>
  );
}
