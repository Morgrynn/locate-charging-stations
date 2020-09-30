import React from 'react';
// import styles from './Main.module.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

// Application displays chargers on a map, all specified charger types and pricings displayed, search functionality
// TODO
// Get this map up and running
// Add search functionality
// link to back end

const libraries = ['places'];

const mapContainerStyle = {
  width: '80vw',
  height: '80vh',
  marginTop: '50px',
  marginRight: 'auto',
  marginLeft: 'auto',
};

const center = {
  lat: 65.0121,
  lng: 25.4652,
};

const options = {
  disableDefaultUI: true,
};

export default function RenderMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // GoogleMaps loadError
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}></GoogleMap>
    </div>
  );
}
