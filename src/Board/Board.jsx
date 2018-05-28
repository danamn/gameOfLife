import React, { Component } from 'react';
import { css } from 'glamor';
import _ from 'lodash';
import Cell from './Cell/Cell.jsx';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: 0,
      cellsGrid: [],
      showDeadModal: false
    };
  }

  componentDidMount() {
    this.makeNewGrid(true);
  }

  componentWillUnmount() {
    clearTimeout(this.growthTimeout);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this.makeNewGrid(true);
    }

    if (prevProps.speed !== this.props.speed) {
      clearTimeout(this.growthTimeout);
      if (this.props.isOn) {
        this.startEvolving();
      }
    }

    if (this.props.isOn !== prevProps.isOn) {
      if (this.props.isOn) {
        this.setState({ showDeadModal: false });
        this.startEvolving();
      } else {
        clearTimeout(this.growthTimeout);
      }
    }
  }

  makeNewGrid = isRandom => {
    this.setState({
      generation: 0,
      showDeadModal: false
    });
    clearTimeout(this.growthTimeout);
    const cellsGrid = this.createGrid(isRandom, false);
    this.setState({ cellsGrid: cellsGrid });
  };

  createGrid = (isRandom, isOn) => {
    const { width, height } = this.props;
    let cellsGrid = [];
    _.forEach(_.range(height), (row, i) => {
      let gridRow = [];
      _.forEach(_.range(width), (cell, j) => {
        gridRow[j] = isRandom ? this.randomAlive() : isOn ? this.calculateIfCellAlive(i, j) : false;
      });
      cellsGrid.push(gridRow);
    });

    return cellsGrid;
  };

  randomAlive() {
    return Math.random() >= 0.5;
  }

  startEvolving = () => {
    const getSpeed = () => {
      switch (this.props.speed) {
        case 0:
          return 1200;
        case 1:
          return 800;
        case 2:
          return 300;
        default:
          return 1000;
      }
    };

    clearTimeout(this.growthTimeout);
    this.evolveCells();
  };

  evolveCells = () => {
    clearTimeout(this.growthTimeout);
    let boardIsEmpty = true;

    let cellsGrid = this.createGrid(false, true);

    this.setState({ cellsGrid: cellsGrid, generation: this.state.generation + 1 });
    this.growthTimeout = setTimeout(this.evolveCells, 10);

    // this.setState({ cellsGrid: cellsGrid, generation: this.state.generation + 1 }, () => {
    //   this.growthTimeout = setTimeout(this.evolveCells, 10);
    // });

    // if (boardIsEmpty) {
    //   this.stopEvolution();
    // }
  };

  calculateIfCellAlive = (i, j) => {
    const aliveNeighborsCount = this.getCountOfAliveNeighbors(i, j);

    if (aliveNeighborsCount === 2) return this.state.cellsGrid[i][j];
    if (aliveNeighborsCount === 3) return true;

    return false;
  };

  getCountOfAliveNeighbors = (i, j) => {
    const { height, width } = this.props;
    const surroundingCoords = {
      n: i - 1 >= 0 ? i - 1 : height - 1,
      s: i + 1 <= height - 1 ? i + 1 : 0,
      w: j - 1 >= 0 ? j - 1 : width - 1,
      e: j + 1 <= width - 1 ? j + 1 : 0,
      i: i,
      j: j
    };

    const neighborsPosition = ['nw', 'nj', 'ne', 'ie', 'iw', 'sw', 'sj', 'se'];
    let aliveCount = 0;

    neighborsPosition.forEach((np, i) => {
      let coordinates = np.split('');
      const x = surroundingCoords[coordinates[0]];
      const y = surroundingCoords[coordinates[1]];

      if (this.state.cellsGrid[x][y]) {
        aliveCount++;
        if (aliveCount > 3 || (i > 6 && aliveCount === 0)) {
          return aliveCount;
        }
      }
    });
    return aliveCount;
  };

  handleCellClick = (i, j) => {
    const cellsGrid = _.cloneDeep(this.state.cellsGrid);
    cellsGrid[i][j] = !this.state.cellsGrid[i][j];
    this.setState({ cellsGrid: cellsGrid });
  };

  stopEvolution = () => {
    clearInterval(this.growthInterval);
    this.setState({ showDeadModal: true });
    this.props.toggleOverlay();
  };

  handleModalClick = () => {
    this.setState({ showDeadModal: false, generation: 0 });
    this.props.toggleOverlay();
  };

  render() {
    const boardStyle = css({
      position: 'relative',
      display: 'table',
      margin: '50px auto 10px',
      textAlign: 'center',
      padding: '3px 20px 20px',
      background: '#356155',
      boxShadow: ` 
      0 0 2px 2px rgb(180, 255, 193), 0 0 0 6px rgba(46, 76, 78, 0.9), 0 0 0 8px rgba(255, 255, 255, 1)
    `
    });
    const generationStyle = css({
      fontFamily: 'Architects Daughter, sans-serif',
      fontSize: '20px',
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
    });

    const rowStyle = css({
      //  display: 'table-row',
      display: 'block',
      height: '12px'
    });

    const deadModalStyle = css({
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
    });

    const deadModalBtn = css({
      padding: '0.5em 1em',
      border: '2px solid lightblue',
      borderRadius: '3px'
    });

    return (
      <div>
        <div {...boardStyle}>
          <div {...generationStyle}>
            Generations: <span> {this.state.generation}</span>
          </div>
          {this.state.cellsGrid.length > 0
            ? _.range(this.props.height).map((row, i) => (
                <div key={i} {...rowStyle}>
                  {_.range(this.props.width).map((col, j) => (
                    <Cell
                      key={`${i}${j}`}
                      //    ref={cell => (this[`cell_${i + 1}_${j + 1}`] = cell)}
                      alive={this.state.cellsGrid[i] ? this.state.cellsGrid[i][j] : false}
                      onClick={() => this.handleCellClick(i, j)}
                    />
                  ))}
                </div>
              ))
            : null}
        </div>
        {this.state.showDeadModal ? (
          <div {...deadModalStyle}>
            <p>
              Everyone died after {this.state.generation} generation{this.state.generation > 1 ? 's' : null}.
            </p>
            <button {...deadModalBtn} onClick={this.handleModalClick}>
              OK
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Board;
