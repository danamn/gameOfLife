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
      showDeadModal: false,
    };
  }

  componentDidMount() {
    this.createGrid(true);
  }

  componentWillUnmount() {
    clearInterval(this.growthInterval);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
      this.makeNewGrid(true);
    }

    if (prevProps.speed !== this.props.speed) {
      clearInterval(this.growthInterval);
      if (this.props.isOn) {
        this.startEvolving();
      }
    }

    if (this.props.isOn !== prevProps.isOn) {
      if (this.props.isOn) {
        this.setState({showDeadModal: false})
        this.startEvolving();
      } else {
        clearInterval(this.growthInterval);
      }
    }
  }

  makeNewGrid = isRandom => {
    this.setState({
      generation: 0,
      showDeadModal: false
    });
    clearInterval(this.growthInterval);
    this.createGrid(isRandom);
  };

  createGrid = isRandom => {
    const { width, height } = this.props;
    let cellsGrid = [];
    _.forEach(_.range(height), row => {
      let gridRow = [];
      _.forEach(_.range(width), (cell, i) => {
        gridRow[i] = isRandom ? this.randomAlive() : false;
      });
      cellsGrid.push(gridRow);
    });

    this.setState({ cellsGrid: cellsGrid });
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
          return 900;
        case 2:
          return 400;
        default:
          return 1000;
      }
    };

    this.growthInterval = setInterval(() => {
      this.setState(prevState => {
        return { generation: prevState.generation + 1 };
      }, this.evolveCells());
    }, getSpeed());
  };

  evolveCells = () => {
    let cellsGrid = _.cloneDeep(this.state.cellsGrid);

    let boardIsEmpty = true;

    _.forEach(cellsGrid, (row, i) => {
      _.forEach(row, (cell, j) => {
        const isCellAlive = this.calculateIfCellAlive(i, j);
        cellsGrid[i][j] = isCellAlive;
        if (isCellAlive) boardIsEmpty = false;
      });
    });

    this.setState({ cellsGrid: cellsGrid });
    if (boardIsEmpty) {
      this.stopEvolution();
    }
  };

  calculateIfCellAlive = (i, j) => {
    const aliveNeighborsCount = this.getCountOfAliveNeighbors(i, j);
    const isAlive = this.state.cellsGrid[i][j];
    if (isAlive) {
      if (aliveNeighborsCount < 2 || aliveNeighborsCount > 3) {
        return false;
      }
      return true;
    } else {
      if (aliveNeighborsCount === 3) {
        return true;
      }
      return false;
    }
  };

  getCountOfAliveNeighbors = (i, j) => {
    const { height, width } = this.props;
    const above = i - 1 >= 0 ? i - 1 : height - 1;
    const below = i + 1 <= height - 1 ? i + 1 : 0;
    const left = j - 1 >= 0 ? j - 1 : width - 1;
    const right = j + 1 <= width - 1 ? j + 1 : 0;
    const coordinates = [
      { x: above, y: left },
      { x: above, y: j },
      { x: above, y: right },
      { x: i, y: left },
      { x: i, y: right },
      { x: below, y: left },
      { x: below, y: j },
      { x: below, y: right }
    ];

    let aliveCount = 0;
    _.forEach(coordinates, el => {
      if (this.state.cellsGrid[el.x][el.y]) {
        aliveCount++;
      }
    });
    return aliveCount;
  };

  handleCellClick(i, j) {
    const cellsGrid = _.cloneDeep(this.state.cellsGrid);
    cellsGrid[i][j] = !this.state.cellsGrid[i][j];
    this.setState({ cellsGrid: cellsGrid });
  }

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
      width: '420px',
      height: '200px',
      margin: '0 auto',
      border: '1px solid green',
      fontFamily: 'Roboto'
    });

    const columnStyle = css({
      display: 'block',
      height: '17px'
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
      <div {...boardStyle}>
        Generation: {this.state.generation}
        {_.range(this.props.height).map((row, i) => (
          <div key={i} {...columnStyle}>
            {_.range(this.props.width).map((col, j) => (
              <Cell
                key={`${i}${j}`}
                //    ref={cell => (this[`cell_${i + 1}_${j + 1}`] = cell)}
                alive={this.state.cellsGrid[i] ? this.state.cellsGrid[i][j] : false}
                onClick={() => this.handleCellClick(i, j)}
              />
            ))}
          </div>
        ))}
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
