import React from 'react';
import styles from '../styles/SearchResult.module.css';
import ToggleComponent from '../ToggleComponent';

export default function SearchResult(props) {
  const dataArray = [...props.data, ...props.moreData];
  let filteredLocations = dataArray.filter((station) => {
    return (
      (station.AddressInfo.title || station.AddressInfo.line)
        .toLowerCase()
        .indexOf(props.searchLocation.toLowerCase()) !== -1
    );
  });

  let displayList = null;

  if (props.searchLocation.length !== 0) {
    return (displayList = (
      <div className={styles.container}>
        {filteredLocations.slice(0, 3).map((station, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                props.clickLocation(
                  Number(station.Geometery.latitude),
                  Number(station.Geometery.longitude)
                );
              }}
              className={styles.listItem}>
              <p>
                <strong>Place Name:</strong> {station.AddressInfo.title}
              </p>
              <p>{station.AddressInfo.line}</p>
              <p>
                <strong>Town:</strong> {station.AddressInfo.town}
              </p>
              <ToggleComponent>
                {({ on, toggle }) => {
                  let a = station.Connections.ConnectType1;
                  let c = station.Connections.ConnectType3;
                  return (
                    <div>
                      <button onClick={toggle}>More Information ...</button>
                      {on && (
                        <ol className={styles.ol}>
                          <li>
                            Cost: {a.price} Charge: {a.charge}{' '}
                          </li>
                          <li>
                            Cost: {c.price} Charge: {c.charge}{' '}
                          </li>
                        </ol>
                      )}
                    </div>
                  );
                }}
              </ToggleComponent>
            </li>
          );
        })}
      </div>
    ));
  }

  return <div className={styles.locationContainer}>{displayList}</div>;
}
