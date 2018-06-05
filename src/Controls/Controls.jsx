import React from 'react';

import styles from './glamor';

const controlls = props => {
  return (
    <div>
      <div {...styles.controlsWrapper}>
        <h2 {...styles.title}> Controls </h2>
        <button {...styles.button} type="button" onClick={props.onAppToggle}>
          {props.isOn ? 'Pause' : 'Start'}
        </button>
        <button {...styles.button} type="button" onClick={props.onSetRandom} disabled={props.isOn}>
          Random
        </button>
        <button {...styles.button} type="button" onClick={props.onClear}>
          Clear
        </button>
      </div>

      <div {...styles.controlsWrapper}>
        <h2 {...styles.title}> Size </h2>
        <span {...styles.lable}> Width: </span>
        <input
          value={props.width}
          type="number"
          min="1"
          max="100"
          onChange={props.onWidthChange}
          disabled={props.isOn}
        />
        <span  {...styles.lable} > Height: </span>
        <input
          value={props.height}
          type="number"
          min="1"
          max="50"
          onChange={props.onHeightChange}
          disabled={props.isOn}
        />
      </div>
      <div {...styles.controlsWrapper}>
        <h2 {...styles.title}> Speed </h2>
        <button {...styles.button} type="button" onClick={() => props.onSpeedChange(0)}>
          Slow
        </button>
        <button {...styles.button} type="button" onClick={() => props.onSpeedChange(1)}>
          Medium
        </button>
        <button {...styles.button} type="button" onClick={() => props.onSpeedChange(2)}>
          Fast
        </button>
      </div>
    </div>
  );
};

export default controlls;
