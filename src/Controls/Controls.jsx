import React from 'react';

import styles from './glamor';

const controls = props => {
  return (
    <div>
      <div {...styles.controlsWrapper}>
        <h2 {...styles.title}> Controls </h2>
        <div {...styles.commandsWrapper}>
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
      </div>

      <div {...styles.controlsWrapper}>
        <h2 {...styles.title}> Size </h2>
        <div {...styles.commandsWrapper}>
          <span {...styles.label}> Width: </span>
          <input
            value={props.width}
            type="number"
            min="1"
            max="100"
            onChange={props.onWidthChange}
            disabled={props.isOn}
          />
          <span {...styles.label}> Height: </span>
          <input
            value={props.height}
            type="number"
            min="1"
            max="50"
            onChange={props.onHeightChange}
            disabled={props.isOn}
          />
        </div>
      </div>
      <div {...styles.controlsWrapper}>
        <h2 {...styles.title}> Speed </h2>
        <div {...styles.commandsWrapper}>
          <button {...styles.button} style={props.speed === 'slow'? {background: '#fff'}: null} type="button"  onClick={() => props.onSpeedChange('slow')}>
            Slow
          </button>
          <button {...styles.button} style={props.speed === 'medium'? {background: '#fff'}: null} type="button" onClick={() => props.onSpeedChange('medium')}>
            Medium
          </button>
          <button {...styles.button}  style={props.speed === 'fast'? {background: '#fff'}: null} type="button" onClick={() => props.onSpeedChange('fast')}>
            Fast
          </button>
        </div>
      </div>
    </div>
  );
};

export default controls;
