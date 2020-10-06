import React from 'react';
import styles from './styles/SearchResult.module.css';

export default function SearchResult(props) {
  let filteredLocations = props.locationDataSet.filter((station) => {
    return (
      station.AddressInfo.Title.toLowerCase().indexOf(
        props.searchLocation.toLowerCase()
      ) !== -1
    );
  });

  let displayList = <div></div>;

  if (props.searchLocation.length != 0) {
    return (displayList = (
      <>
        {filteredLocations.map((station, i) => {
          return (
            <li key={i} className={styles.listItem}>
              {station.AddressInfo.Title}
            </li>
          );
        })}
      </>
    ));
  }

  return <div className={styles.locationContainer}>{displayList}</div>;
}
