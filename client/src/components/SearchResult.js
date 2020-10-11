import React from 'react';
import styles from './styles/SearchResult.module.css';
import ToggleComponent from './ToggleComponent';

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
                  return (
                    <div>
                      <button onClick={toggle}>More Inforation ...</button>
                      {on && (
                        <>
                          <p>Cost: {station.Connections.ConnectType1.price}</p>
                          <p>
                            Charge: {station.Connections.ConnectType1.charge}
                          </p>
                          <p>Type: {station.Connections.ConnectType1.type}</p>
                          <p>Speed: {station.Connections.ConnectType1.speed}</p>
                        </>
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
