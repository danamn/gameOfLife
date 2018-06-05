import { css } from 'glamor';

export default {
  controlsWrapper: css({
    position: 'relative',
    minWidth: '250px',
    width: '30%',
    height: '2.7em',
    margin: '20px auto',
    fontFamily: 'Architects Daughter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '3px 20px 20px',
    background: '#356155',
    boxShadow: ` 
        0 0 2px 2px rgb(180, 255, 193), 0 0 0 4px rgba(46, 76, 78, 0.9), 0 0 0 5px rgba(255, 255, 255, 1)
      `,
      '& input':{
          width: '3em',
          fontSize: '1.2em',
      }
  }),

  title: css({
      margin: '3px 50px 3px 10px',
      letterSpacing: '1px',
      display: 'inline-block'
  }),

  lable: css({
    fontSize: '1.3em',
    letterSpacing: '0.9px',
    paddingRight: '5px',
    paddingLeft: '10px'
  }),

  button: css({
    position: 'relative',
    display: 'inline-block',
    width: '5.5em',
    height: '2em',
    margin: '5px 10px',
    border: '1px solid #333',
    backgroundColor: '#09a244',
    backgroundImage: 'linear-gradient(rgb(39, 216, 69), rgb(37, 195, 99) )',
    borderRadius: '5px',
    boxShadow: '0px 1px 4px -2px #333',
    fontFamily: 'Architects Daughter, sans-serif',
    fontSize: '1.3em',
    fontWeight: 'bold',
    letterSpacing: '0.9px',
    ':after': {
      content: "''",
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: 'calc(100% - 4px)',
      height: '50%',
      background: 'rgba(180,180,180,0.7)',
      background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.02))'
    }
  })
};
