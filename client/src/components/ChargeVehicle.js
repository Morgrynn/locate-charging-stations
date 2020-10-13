import React from 'react';
import { Link } from 'react-router-dom';
import imgIcon from '../images/Electric.png';
import styles from './styles/ChargeVehicle.module.css';
import Type1 from './stationComponent/Type1';
import Type2 from './stationComponent/Type2';
import Type3 from './stationComponent/Type3';
import Type4 from './stationComponent/Type4';
import Charge from './stationComponent/Charge';

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
        <div className={styles.title}>
          <div className={styles.logo}>
            <img className={styles.img} src={imgIcon} alt='Electric Charger' />
            <h2>LocaleCharge</h2>
          </div>

          <h3>Welcome {username.toUpperCase()} </h3>
          <div className={styles.div}>
            <div className={styles.btnMap}>
              <Link to='/'>View Locations on Map</Link>
            </div>
            <div className={styles.btnHistory}>
              <Link to='/users/history'>View history</Link>
            </div>
          </div>
        </div>
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
              <div className={styles.btnContainer}>
                <div className={styles.btn}>
                  <Link to='/users/history'>View history</Link>
                </div>
              </div>
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
