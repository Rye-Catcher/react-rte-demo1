import React, { Component } from 'react';
import './Game.css';

const DIM = 4;
const player_num = 2;

function Cell(props) {
    const {value} = props;
    return (
      <button className="cell" onClick={props.onClick}>
        {value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(DIM * DIM).fill(null),
      current_player: 'A',
      gold_to_level: 25,
      player_gold: Array(player_num).fill(25)
    };
  }

  handleClick(i) {
    const {cells, current_player, player_num, gold_to_level, player_gold} = this.state;
    
    const squares = cells.slice();
    let nxt_gold = player_gold.slice();

    nxt_gold = calculateProfit(nxt_gold, squares);

    if (calculateWinner(squares)) {
      return;
    }

    let index = current_player.charCodeAt(0) - 65;

    if (nxt_gold[index] < gold_to_level) {
      alert("Insufficient gold");
      return;
    }

    if (squares[i] == null) {
      squares[i] = current_player + '1';
      nxt_gold[index] = nxt_gold[index] - gold_to_level;
    } else {
      if (squares[i][0] != current_player) {
        return;
      } else {
        squares[i] = current_player + (squares[i][1] - '0' + 1).toString();
        nxt_gold[index] = nxt_gold[index] - gold_to_level;
      }
    }
    
    this.setState({
      cells: squares, 
      current_player: current_player==='A' ? 'B' : 'A',
      player_gold: nxt_gold});
  }

  renderCell(i) {
    const {cells, current_player} = this.state;
    return (
      <Cell
        value={cells[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const {cells, current_player, player_num, player_gold} = this.state;
    const winner = calculateWinner(cells, player_gold);
    let nxt_player, gold_dashboard, upgrade_dashboard;

    if (winner) {
      nxt_player = 'Winner: ' + winner;
    } else {
      nxt_player = 'Next player: ' + 
        (current_player==='A' ? 'A' : 'B');
    }

    gold_dashboard = 'Player A has ' + player_gold[0].toString() + ' gold'
      + ', ' + 'Player B has ' + player_gold[1].toString() + ' gold';

    upgrade_dashboard = "Need 25 golds to upgrade/build a building"

    return (
      <div>
        <div className="nxt_player">{nxt_player}</div>
        <div className="gold_dashboard">{gold_dashboard}</div>
        <div className="upgrade_dashboard">{upgrade_dashboard}</div>
        <br></br>
        <div className="board-row">
          {this.renderCell(0)}{this.renderCell(1)}{this.renderCell(2)}{this.renderCell(3)}
        </div>
        <div className="board-row">
          {this.renderCell(4)}{this.renderCell(5)}{this.renderCell(6)}{this.renderCell(7)}
        </div>
        <div className="board-row">
          {this.renderCell(8)}{this.renderCell(9)}{this.renderCell(10)}
          {this.renderCell(11)}
        </div>
        <div className="board-row">
          {this.renderCell(12)}{this.renderCell(13)}{this.renderCell(14)}
          {this.renderCell(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(cells, player_gold) {
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let index = i * DIM + j;
      if (!cells[index]) {
        return null;
      }
    }
  }
  return player_gold[0] > player_gold[1] ? 'A' : 'B';
}

function calculateProfit(cur_gold, cells) {
  let nxt_gold = cur_gold.slice();
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let index = i * DIM + j;
      if(cells[index]) {
        nxt_gold[cells[index][0].charCodeAt(0) - 65] 
          += 15 * (cells[index][1].valueOf()); 
      }
    }
  }
  return nxt_gold;
}

export default Game;
