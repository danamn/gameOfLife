import React from 'react';
import { css } from 'glamor';

const cell = props => {
  const cellStyle = css({
    position: 'relative',
    display: 'inline-block',
   // display: 'table-cell',
    width: '10px',
    height: '10px',   
    border: '1px solid #333',
    background: /*props.alive? 'linear-gradient(rgb(39, 216, 69), rgb(37, 195, 99) )' : */ '#444',
    // borderLeft: '1px solid #fff',
    // borderBottom: '1px solid #fff',
    // //  background: props.alive ? 'red' : 'black ',
     borderRadius: "3px",
    // boxShadow: "0px 1px 4px -2px #333",
    // ':after': {
    //   content:"''",
    //   position: 'absolute',
    //   top: '2px',
    //   left: '2px',
    //   width: 'calc(100% - 4px)',
    //   height: '50%',
    // //  background: 'linear-gradient(rgba(180,180,180,0.7), rgba(180,180,180,0.2))'
    //   background: 'rgba(180,180,180,0.7)'
    // }
  });

  const aliveCell = css({
    backgroundColor:  '09a244' ,
    backgroundImage: 'linear-gradient(rgb(39, 216, 69), rgb(37, 195, 99) )',
    // border: '1px solid #278e49',
  //   ':after': {
  //   //  background: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.2))'
  //     background: 'rgba(255,255,255,0.8)'
  //  }
  })

  return <div {...cellStyle} className = {props.alive? aliveCell : ''} onClick={props.onClick} />;
};

export default cell;
