import React from "react";
import { css } from "glamor";

const cell = props => {
  const cellStyle = css({
    display: "inline-block",
    width: "15px",
    height: "15px",
    border: "1px solid #fff",
    background: props.alive ? "red" : "black "
  });

  return <div {...cellStyle} onClick={props.onClick} />;
};

export default cell;
