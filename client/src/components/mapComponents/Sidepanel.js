import React from 'react';
import styles from '../styles/Sidepanel.module.css';
import AddressCard from '../panelComponents/AddressCard';
import PriceCard from '../panelComponents/PriceCard';
import ChargeCard from '../panelComponents/ChargeCard';
import ButtonCard from '../panelComponents/ButtonCard';

export default function Sidepanel({ location, click, charge }) {
  return (
    <div className={styles.sidepanel}>
      <div className={styles.closebtn} onClick={click}></div>
      <AddressCard location={location} />
      <PriceCard location={location} />
      <ChargeCard location={location} />
      <ButtonCard location={location} charge={charge} />
    </div>
  );
}
