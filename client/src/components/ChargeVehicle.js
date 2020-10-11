import React from 'react';
import { Link } from 'react-router-dom';
import imgIcon from '../images/Electric.png';
import styles from './styles/ChargeVehicle.module.css';
import Type1 from './stationComponent/Type1';
import Type2 from './stationComponent/Type2';
import Type3 from './stationComponent/Type3';
import Type4 from './stationComponent/Type4';
import Charge from './stationComponent/Charge';

// - provides information of the charger locations
// - provides the status and pricing to the customer.
// - customer can use the app to start and stop the charging of car
// - when plugged in they can be billed for the charge.

// Two types of charges:
// - "Slow" 22kW chargers with Type 2 connectors
// - "Fast" 50-150kW chargers with CCS connectors
// Price of charging can be different options:
// - some of the slow chargers are free, but still require application to be used to start the charging
// - some of the slow chargers are paid by the minute (0,20€/min)
// - fast chargers are paid by consumed electricity (18 c/kWh)

// - Start charging once the user has connected his car to a charger
// - The charger process is started by entering a four digit string to the system to indicate which charger    the customer wants to use ("A4CV" for example). The application should display this four digit code and the code would be visible in the charge station as well.
// - Monitoring the ongoing charge and its costs
// - Stop charging

// - View previous charges and their costs
// - Display date and time information, charger location, its information, charge time, energy used and cost
// - the actual payment of the charges is not covered by this application

export default function ChargeVehicle({
  station,
  username,
  handleChargeType,
  chargeCode,
  updateCodeValue,
  startCharge,
  warning,
  startTimer,
  stopTimer,
  resetTimer,
  cent,
  power,
  timerOn,
  timerStart,
  timerTime,
  parentCallback,
  postHistory,
}) {
  const getDate = new Date();
  // get the date as a string
  const date = getDate.toDateString();
  // get the time as a string
  const time = getDate.toLocaleTimeString();

  let display;

  if (station.length < 1) {
    display = (
      <div className={styles.ifContainer}>
        <h3>Welcome {username.toUpperCase()} </h3>
        <Link to='/history'>View history</Link>
      </div>
    );
  } else {
    display = (
      <>
        <div className={styles.topItem}>
          <div className={styles.topleft}>
            <div>
              <div className={styles.title}>
                <div className={styles.logo}>
                  <img
                    className={styles.img}
                    src={imgIcon}
                    alt='Electric Charger'
                  />
                  <h2>LocaleCharge</h2>
                </div>
                <h3>{station.AddressInfo.title} charging station</h3>
                <p>Welcome {username.toUpperCase()}</p>
                <p>
                  {date} {time}
                </p>
                <p>Station ID: {station.id}</p>
              </div>
              <Link to='/history'>View history</Link>
            </div>
          </div>
        </div>
        <div className={styles.topItem}>
          <div>
            <Charge
              chargeCode={chargeCode}
              updateCodeValue={updateCodeValue}
              startCharge={startCharge}
              warning={warning}
              startTimer={startTimer}
              stopTimer={stopTimer}
              resetTimer={resetTimer}
              cent={cent}
              power={power}
              timerOn={timerOn}
              timerStart={timerStart}
              timerTime={timerTime}
              parentCallback={parentCallback}
              postHistory={postHistory}
            />
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <Type1
            station={station}
            handleChargeType={handleChargeType}
            username={username}
          />
          <Type2
            station={station}
            handleChargeType={handleChargeType}
            username={username}
          />
          <Type3
            station={station}
            handleChargeType={handleChargeType}
            username={username}
          />
          <Type4
            station={station}
            handleChargeType={handleChargeType}
            username={username}
          />
        </div>
      </>
    );
  }
  return <div className={styles.container}>{display}</div>;
}
