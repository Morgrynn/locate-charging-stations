import React from 'react';
import styles from '../styles/ChargeVehicle.module.css';

export default function Charge({
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
  timerTime,
  parentCallback,
  postHistory,
}) {
  let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
  let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);
  let e = '0' + power * (Math.floor(timerTime / 1000) % 60);
  let c = '0' + power * e * cent;
  let energy = '0' + power * (Math.floor(timerTime / 60000) % 60);
  let cost = '0' + power * energy * cent;
  let kiloWatthour = '0' + power * Math.floor(timerTime / 3600000);
  let kwCost = '0' + power * kiloWatthour * cent;

  const getDuration = () => {
    let duration = `Time Duration ${hours}:${minutes}:${seconds}`;
    let chargeCost = `${cost} €0.20/min, ${kwCost} €0.18/kWh`;
    console.log(duration);
    console.log(chargeCost);
    parentCallback(duration, chargeCost);
  };

  let minPerkwDisplay = (
    <>
      {' '}
      <div>Electrical Power {parseFloat(e).toFixed(10)} w</div>
      <div>Cost for Charger €/sec {parseFloat(c).toFixed(10)}€</div>{' '}
      <div>Electrical Power {parseFloat(energy).toFixed(10)} kw</div>
      <div>Cost for Charger 0.20€/min {parseFloat(cost).toFixed(10)}€</div>{' '}
    </>
  );

  let centperkWhDisplay = (
    <>
      {' '}
      <div>Electrical Power {parseFloat(e).toFixed(10)} w</div>
      <div>Cost for Charger €/sec {parseFloat(c).toFixed(10)}€</div>{' '}
      <div>Electrical Power {parseFloat(energy).toFixed(10)} kw</div>
      <div>Cost for Charger 0.20€/min {parseFloat(cost).toFixed(10)}€</div>{' '}
      <div>Electrical Power {parseFloat(kiloWatthour).toFixed(10)} kWh</div>
      <div>
        Cost for Charger 0.18c/kWh {parseFloat(kwCost).toFixed(10)}€
      </div>{' '}
    </>
  );

  let stopwatch = (
    <>
      <div>
        Duration: {hours} : {minutes} : {seconds} : {centiseconds}
      </div>
      {chargeCode === 'A4CV' && minPerkwDisplay}
      {chargeCode === 'A5CV' && minPerkwDisplay}
      {chargeCode === 'A6CV' && centperkWhDisplay}
      {chargeCode === 'A8CV' && centperkWhDisplay}
    </>
  );
  return (
    <div className={styles.topright}>
      <form className={styles.form} onSubmit={startCharge}>
        <div className={styles.label}>
          <label style={warning}>
            Click on Charge type to activate charging code:{' '}
          </label>
          <input
            type='text'
            size='4'
            value={chargeCode}
            onChange={updateCodeValue}
          />
        </div>
        {/* <input type='text' hidden onChange={updatedb} /> */}
        <div className={styles.timer}>{stopwatch}</div>
        {/* <div className={styles.energy}>{energy}</div> */}
        <div className={styles.btndiv}>
          {timerOn === false && timerTime === 0 && (
            <button className={styles.submitBtn} type='submit'>
              Start
            </button>
          )}
          {timerOn === true && (
            <button
              className={styles.stopBtn}
              onChange={postHistory}
              onClick={() => {
                stopTimer();
                getDuration();
                postHistory();
              }}>
              Stop
            </button>
          )}
          {timerOn === false && timerTime > 0 && (
            <button onClick={startTimer}>Resume</button>
          )}
          {timerOn === false && timerTime > 0 && (
            <button onClick={resetTimer}>Reset</button>
          )}
        </div>
      </form>
    </div>
  );
}
