import React from 'react';
import styles from './styles/Searchbar.module.css';

export default function Searchbar(props) {
  return (
    <div className={styles.searchbar}>
      <input
        className={styles.input}
        type='text'
        onChange={props.onSearch}
        value={props.searchLocation}
        placeholder='Search...'
      />
    </div>
  );
}
