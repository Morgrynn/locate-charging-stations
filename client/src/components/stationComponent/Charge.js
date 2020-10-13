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

  let kwPerMin = power * (timerTime / 60000);
  let costPerMin = cent * kwPerMin;

  let kiloWatthour = power * (timerTime / 3600000);
  let kWhCost = kiloWatthour * cent;

  const getDuration = () => {
    const duration = `${Math.floor(timerTime / 3600000)}h:${
      Math.floor(timerTime / 60000) % 60
    }m:${Math.floor(timerTime / 1000) % 60}s`;
    let chargeCost;
    if (power < 40) {
      chargeCost = `Cost ${costPerMin.toFixed(2)}€/min`;
    } else {
      chargeCost = `Cost ${kWhCost.toFixed(2)}€/kWh`;
    }
    parentCallback(duration, chargeCost);
  };

  let displayCharge;

  if (power < 40) {
    displayCharge = (
      <>
        <div>Charge {kwPerMin.toFixed(2)} kw</div>
        <div>Cost {costPerMin.toFixed(2)} €/min </div>
      </>
    );
  } else {
    displayCharge = (
      <>
        <div>Charge {kiloWatthour.toFixed(2)} kWh</div>
        <div>Cost {kWhCost.toFixed(2)} €/kWh </div>
      </>
    );
  }

  let stopwatch = (
    <>
      <div>
        Duration: {hours} : {minutes} : {seconds} : {centiseconds}
      </div>
      {chargeCode === 'A4CV' && displayCharge}
      {chargeCode === 'A5CV' && displayCharge}
      {chargeCode === 'A6CV' && displayCharge}
      {chargeCode === 'A8CV' && displayCharge}
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
        <div className={styles.timer}>{stopwatch}</div>
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
              }}>
              Stop
            </button>
          )}

          {timerOn === false && timerTime > 0 && (
            <button
              className={styles.resumeBtn}
              onClick={() => {
                getDuration();
                startTimer();
              }}>
              Resume
            </button>
          )}
          {timerOn === false && timerTime > 0 && (
            <button
              className={styles.resetBtn}
              onClick={() => {
                postHistory();
                stopTimer();
                resetTimer();
              }}>
              Stop
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
