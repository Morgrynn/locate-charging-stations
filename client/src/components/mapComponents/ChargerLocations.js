import React, { useState } from 'react';
import MapGl, { Marker, Popup } from 'react-map-gl';
import Searchbar from '../Searchbar';
import SearchResult from '../SearchResult';
import styles from '../styles/ChargerLocation.module.css';
import Sidepanel from './Sidepanel';
import Backdrop from '../Backdrop';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default function ChargerLocations(props) {
  const [selectedStation, setSelectedStation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [findLocation, setFindLocation] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 65.0121,
    longitude: 25.4652,
    width: '100%',
    height: '90vh',
    zoom: 5,
  });

  // Reset viewport onclose Popup
  const resetViewport = () => {
    setViewport({
      ...viewport,
      latitude: 65.0121,
      longitude: 25.4652,
      zoom: 6,
      transitionDuration: 1000,
    });
  };

  // Zooms in to clicked location
  const clickLocation = (latitude, longitude, locationId) => {
    setViewport({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
      zoom: 15,
      transitionDuration: 1000,
    });
    handleLocationData(locationId);
  };

  // Send location id and data to sidepanel
  const handleLocationData = (input) => {
    const dataArray = [...props.data, ...props.moreData];
    const result = dataArray.find((location) => location.id === input);
    if (result !== -1) {
      console.log(result);
      setFindLocation(result);
    } else {
      console.log('error');
    }
  };

  // Side Panel functions
  // ---------------------------------------
  const sidepanelToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const backdropToggle = () => {
    setIsOpen(false);
  };

  let sidepanel;
  let backdrop;
  if (isOpen) {
    sidepanel = (
      <Sidepanel
        location={findLocation}
        click={backdropToggle}
        charge={props.charge}
      />
    );
    backdrop = <Backdrop click={backdropToggle} />;
  }

  // ---------------------------------------------

  return (
    <div className={styles.container}>
      <MapGl
        {...viewport}
        mapStyle='mapbox://styles/t9haan01/ckfz0qfll0sbz19niv1e3c74y'
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <Searchbar
          onSearch={props.onSearch}
          searchLocation={props.searchLocation}
        />
        <SearchResult
          isAuthenticated={props.isAuthenticated}
          searchLocation={props.searchLocation}
          clickLocation={clickLocation}
          data={props.data}
          moreData={props.moreData}
        />
        {sidepanel}
        {backdrop}
        {props.data.map((station, index) => (
          <Marker
            key={index}
            latitude={Number(station.Geometery.latitude)}
            longitude={Number(station.Geometery.longitude)}>
            <button
              className={styles.icon}
              onClick={(e) => {
                e.preventDefault();
                setSelectedStation(station);
                clickLocation(
                  Number(station.Geometery.latitude),
                  Number(station.Geometery.longitude),
                  station.id
                );
                sidepanelToggle();
              }}>
              <img src='/markerOrange.svg' alt='Charging Station Icon' />
            </button>
          </Marker>
        ))}
        {props.moreData.map((station, index) => (
          <Marker
            key={index}
            latitude={Number(station.Geometery.latitude)}
            longitude={Number(station.Geometery.longitude)}>
            <button
              className={styles.icon}
              onClick={(e) => {
                e.preventDefault();
                setSelectedStation(station);
                clickLocation(
                  Number(station.Geometery.latitude),
                  Number(station.Geometery.longitude),
                  station.id
                );
                sidepanelToggle();
              }}>
              <img src='/markerBlue.svg' alt='Charging Station Icon' />
            </button>
          </Marker>
        ))}
        {selectedStation ? (
          <Popup
            anchor='bottom-left'
            tipSize={2}
            latitude={Number(selectedStation.Geometery.latitude)}
            longitude={Number(selectedStation.Geometery.longitude)}
            onClose={() => {
              setSelectedStation(null);
              resetViewport();
              backdropToggle();
            }}>
            <div className={styles.popup}>
              <h3>{selectedStation.AddressInfo.title}</h3>
              <p>{selectedStation.AddressInfo.line}</p>
              <p>
                {selectedStation.AddressInfo.postcode}{' '}
                {selectedStation.AddressInfo.town}
              </p>
            </div>
          </Popup>
        ) : null}
      </MapGl>
    </div>
  );
}
