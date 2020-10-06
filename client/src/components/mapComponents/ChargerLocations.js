import React, { useState } from 'react';
import MapGl, { Marker, Popup } from 'react-map-gl';
import Searchbar from '../Searchbar';
import SearchResult from '../SearchResult';
import styles from './ChargerLocation.module.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default function ChargerLocations(props) {
  const [viewport, setViewport] = useState({
    latitude: 65.0121,
    longitude: 25.4652,
    width: '100%',
    height: '80vh',
    zoom: 4,
    bearing: 0,
    pitch: 0,
  });
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className={styles.container}>
      <MapGl
        {...viewport}
        mapStyle='mapbox://styles/t9haan01/ckfv13pi20ib319oavdqy4q24'
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}>
        <Searchbar
          onSearch={props.onSearch}
          searchLocation={props.searchLocation}
        />
        <SearchResult
          searchLocation={props.searchLocation}
          locationDataSet={props.locationDataSet}
        />
        {props.locationDataSet.map((station, index) => (
          <Marker
            key={index}
            latitude={station.AddressInfo.Latitude}
            longitude={station.AddressInfo.Longitude}>
            <button
              className={styles.icon}
              onClick={(e) => {
                e.preventDefault();
                setSelectedStation(station);
              }}>
              <img src='/charging.svg' alt='Charging Station Icon' />
            </button>
          </Marker>
        ))}

        {selectedStation ? (
          <Popup
            latitude={selectedStation.AddressInfo.Latitude}
            longitude={selectedStation.AddressInfo.Longitude}
            onClose={() => setSelectedStation(null)}>
            <div className={styles.popup}>
              <h3>{selectedStation.AddressInfo.Title}</h3>

              {selectedStation.Connections.map((Connection, index) => {
                return (
                  <>
                    <p>
                      <strong>Connection Type available:</strong>
                    </p>
                    <li key={index}>
                      {Connection.ConnectionType.Title} | Level:{' '}
                      {Connection.Level.Title}
                    </li>
                  </>
                );
              })}
              <p>
                <strong>Cost:</strong>{' '}
              </p>
              {selectedStation.UsageCost || selectedStation.UsageType.Title}
            </div>
          </Popup>
        ) : null}
      </MapGl>
    </div>
  );
}
