import React, { Component } from 'react';
import Board from './Board/Board.jsx';
import Controls from './Controls/Controls.jsx';
import { css } from 'glamor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 50,
      height: 35,
      speed: 'medium',
      isOn: false
    };
  }

  handleHeightChange = e => {
    const height = e.target.value < 50? Math.floor(e.target.value): 50;
    this.setState({ height: height });
  };

  handleWidthChange = e => {
    const width = e.target.value < 100? Math.floor(e.target.value): 100;
    this.setState({ width: width });
  };

  setSpeed = speed => {
    this.setState({ speed: speed });
  };

  toggleApp = () => {
    this.setState(prevState => {
      return { isOn: !prevState.isOn };
    });
  };

  setRandomGrid = () => {
    this.board.makeNewGrid(true);
    this.setState({ isOn: false });
  };

  clearBoard = () => {
    this.board.makeNewGrid(false);
    this.setState({ isOn: false });
  };

  render() {
    const boardStyle = css({
      position: 'relative',
      display: 'table',
      minWidth: '30%',
      margin: '15px auto 20px',
      textAlign: 'center',
      padding: '3px 20px',
      background: '#356155',
      color: '#fff',
      fontSize: '1.5em',
      boxShadow: ` 
      0 0 2px 2px rgb(180, 255, 193), 0 0 0 6px rgba(46, 76, 78, 0.9), 0 0 0 8px rgba(255, 255, 255, 1)
    `
    })

    return (
      <div className="App">

        <div {...boardStyle}>  Conway's Game Of Life - React JS </div>
        <Board
          ref={board => (this.board = board)}
          width={this.state.width}
          height={this.state.height}
          speed={this.state.speed}
          isOn={this.state.isOn}
        />
        <Controls
          isOn={this.state.isOn}
          width={this.state.width}
          height={this.state.height}
          speed={this.state.speed}
          onWidthChange={this.handleWidthChange}
          onHeightChange={this.handleHeightChange}
          onSpeedChange={speed => this.setSpeed(speed)}
          onAppToggle={this.toggleApp}
          onSetRandom={this.setRandomGrid}
          onClear={this.clearBoard}
        />
      </div>
    );
  }
}

export default App;
