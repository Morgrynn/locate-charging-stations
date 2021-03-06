import React from 'react';
import styles from './styles/Backdrop.module.css';

export default function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.click}></div>;
}
