import { css } from 'glamor/umd/index.min.js';

export default {
  board: css({
    position: 'relative',
    display: 'table',
    margin: '50px auto 10px',
    textAlign: 'center',
    padding: '3px 20px 20px',
    background: '#356155',
    boxShadow: ` 
    0 0 2px 2px rgb(180, 255, 193), 0 0 0 6px rgba(46, 76, 78, 0.9), 0 0 0 8px rgba(255, 255, 255, 1)
  `
  }),
  generation: css({
    fontFamily: 'Architects Daughter, sans-serif',
    fontSize: '1.5em',
    display: 'block',
    letterSpacing: '0.9px',
    color: '#fff',
    paddingTop: '5px',
    paddingBottom: '5px',
    '& span': {
      minWidth: '40px',
      display: 'inline-block',
      textAlign: 'left'
    }
  }),
  row: css({
    //  display: 'table-row',
    display: 'block',
    height: '12px'
  }),
  deadModal: css({
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
    background: '#fff',
    color: 'darkblue',
    fontFamily: 'Roboto',
    fontSize: '15px',
    border: '2px solid lightblue',
    borderRadius: '3px',
    zIndex: 101
  }),
  deadModalBtn: css({
    padding: '0.5em 1em',
    border: '2px solid lightblue',
    borderRadius: '3px'
  })
};
