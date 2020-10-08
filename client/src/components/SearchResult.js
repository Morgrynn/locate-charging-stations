import React from 'react';
import styles from './styles/SearchResult.module.css';
import ToggleComponent from './ToggleComponent';

export default function SearchResult(props) {
  let filteredLocations = props.locationDataSet.filter((station) => {
    return (
      station.AddressInfo.Title.toLowerCase().indexOf(
        props.searchLocation.toLowerCase()
      ) !== -1
    );
  });

  let displayList = null;

  if (props.searchLocation.length !== 0) {
    return (displayList = (
      <>
        {filteredLocations.map((station, i) => {
          {
            /* console.log(station.AddressInfo.Town); */
          }
          return (
            <li
              key={i}
              onClick={() => {
                props.clickedLocation(
                  station.AddressInfo.Latitude,
                  station.AddressInfo.Longitude
                );
              }}
              className={styles.listItem}>
              <p>
                <strong>Place Name:</strong> {station.AddressInfo.Title}
              </p>
              <p>
                <strong>Town:</strong> {station.AddressInfo.Town}
              </p>
              <ToggleComponent>
                {({ on, toggle }) => {
                  return (
                    <div>
                      <button onClick={toggle}>More Inforation ...</button>
                      {on && (
                        <>
                          <p>{station.AddressInfo.AccessComments}</p>
                          <p>Cost: {station.UsageCost}</p>
                          <p>Type: {station.UsageType.Title}</p>
                          <button onClick={props.checkLogin}>
                            Charge Vehicle
                          </button>
                        </>
                      )}
                    </div>
                  );
                }}
              </ToggleComponent>
            </li>
          );
        })}
      </>
    ));
  }

  return <div className={styles.locationContainer}>{displayList}</div>;
}
