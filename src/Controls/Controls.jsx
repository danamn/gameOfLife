import React from "react";
import { css } from "glamor";

const controlls = props => {
  return (
    <div>
        <div>
        <button type="button" onClick={props.onAppToggle}> {props.isOn? 'Pause' : 'Start'} </button>
        <button type="button" onClick={props.onSetRandom} disabled={props.isOn} > Random  </button>
        <button type="button" onClick={props.onClear} > Clear  </button>
            

        </div>

      <div>
        <span> Size: </span>
        <span> Width: </span>
        <input
          value={props.width}
          type="number"
          min='1'
          max='50'
          onChange={props.onWidthChange}
          disabled={props.isOn}
        />
        <span> Height: </span>
        <input
          value={props.height}
          type="number"
          min='1'
          max='50'
          onChange={props.onHeightChange}
          disabled={props.isOn}
        />
      </div>
      <div>
        <span> Speed: </span>
        <button type="button" onClick={() => props.onSpeedChange(0)}> Slow </button>
        <button type="button" onClick={() => props.onSpeedChange(1)}> Medium </button>
        <button type="button" onClick={() => props.onSpeedChange(2)}> Fast </button>
       </div>
    </div>
  );
};

export default controlls;
