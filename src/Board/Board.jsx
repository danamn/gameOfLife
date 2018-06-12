import React, { Component } from 'react';
import _ from 'lodash';
import Cell from './Cell/Cell.jsx';
import styles from './glamor';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generation: 0,
      cellsGrid: [],
      speed: 600
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newSpeed;
    switch (nextProps.speed) {
      case 'slow':
        newSpeed = 1000;
        break;
      case 'medium':
        newSpeed = 600;
        break;
      case 'fast':
        newSpeed = 100;
        break;
      default:
        newSpeed = 600;
    }

    if (newSpeed !== prevState.speed) {
      console.log('fn', newSpeed);

      return { speed: newSpeed };
    }
    return null;
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
        this.evolveCells();
      }
    }

    if (this.props.isOn !== prevProps.isOn) {
      if (this.props.isOn) {
        this.setState({ showDeadModal: false });
        this.evolveCells();
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
    const cellsGrid = this.createGrid(isRandom, false).grid;
    this.setState({ cellsGrid: cellsGrid });
  };

  createGrid = (isRandom, isOn) => {
    const { width, height } = this.props;
    let boardIsEmpty = true;
    let cellsGrid = [];
    _.forEach(_.range(height), (row, i) => {
      let gridRow = [];
      _.forEach(_.range(width), (cell, j) => {
        gridRow[j] = isRandom ? this.randomAlive() : isOn ? this.calculateIfCellAlive(i, j) : false;
        if (isOn && this.calculateIfCellAlive(i, j)) {
          boardIsEmpty = false;
        }
      });
      cellsGrid.push(gridRow);
    });

    return { grid: cellsGrid, isEmpty: boardIsEmpty };
  };

  randomAlive() {
    return Math.random() >= 0.5;
  }

  evolveCells = () => {
    clearTimeout(this.growthTimeout);

    let cellsGrid = this.createGrid(false, true);
    this.setState({ cellsGrid: cellsGrid.grid, generation: this.state.generation + 1 });

    if (!cellsGrid.isEmpty) {
      this.growthTimeout = setTimeout(this.evolveCells, this.state.speed);
    }

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

  handleModalClick = () => {
    this.setState({ showDeadModal: false, generation: 0 });
    this.props.toggleOverlay();
  };

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div {...styles.board}>
          <div {...styles.generation}>
            Generations: <span> {this.state.generation}</span>
          </div>
          {this.state.cellsGrid.length > 0
            ? _.range(this.props.height).map((row, i) => (
                <div key={i} {...styles.row}>
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
          <div {...styles.deadModal}>
            <p>
              Everyone died after {this.state.generation} generation{this.state.generation > 1 ? 's' : null}.
            </p>
            <button {...styles.deadModalBtn} onClick={this.handleModalClick}>
              OK
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Board;
