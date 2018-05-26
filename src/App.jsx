import React, { Component } from 'react';
import Board from './Board/Board.jsx';
import Controls from './Controls/Controls.jsx';
import { css } from 'glamor';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 10,
      height: 5,
      speed: 0,
      isOn: false
    };
  }

  handleHeightChange = e => {
    this.setState({ height: Math.floor(e.target.value) });
  };

  handleWidthChange = e => {
    this.setState({ width: Math.floor(e.target.value) });
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

  toggleOverlay = () => {
    this.setState(prevState => {
      return {showOverlay: !prevState.showOverlay}
    }, ()=> {
      if(this.state.showOverlay) this.toggleApp();
    })
  }

  render() {
    const overlayStyle = css({
      position:'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, .2)',
      zIndex: 99
    })

    return (
      <div className="App">

        <Board
          ref={board => (this.board = board)}
          width={this.state.width}
          height={this.state.height}
          speed={this.state.speed}
          isOn={this.state.isOn}
          toggleOverlay={this.toggleOverlay}
        />
        <Controls
          isOn={this.state.isOn}
          width={this.state.width}
          height={this.state.height}
          onWidthChange={this.handleWidthChange}
          onHeightChange={this.handleHeightChange}
          onSpeedChange={speed => this.setSpeed(speed)}
          onAppToggle={this.toggleApp}
          onSetRandom={this.setRandomGrid}
          onClear={this.clearBoard}
        />
          {this.state.showOverlay &&  <div {...overlayStyle}></div>}
      </div>
    );
  }
}

export default App;
