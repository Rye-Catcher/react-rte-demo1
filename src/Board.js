import React, { Component } from 'react';
import './style/Board.css';
import Cell from './Cell.js';
import Status from './Status.js';
import { calculateWinner, calculateProfit, nextPlayer } from './helpers/BoardHelper.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const {size, player_num} = props;
    
    const player_list = [];
    for (let i = 0; i < player_num; i++) {
      player_list[i] = String.fromCharCode(65 + i);
    }

    this.state = {
      cells: Array(size * size).fill(null),
      current_player: 'A',
      gold_to_level: 25,
      player_gold: Array(player_num).fill(25),
      winner: null
    };
  }

  handleClick(i) {
    const {size, player_num} = this.props;
    const {cells, current_player, gold_to_level, player_gold} = this.state;
    
    const squares = cells.slice();
    
    let nxt_gold = player_gold.slice();
    nxt_gold = calculateProfit(nxt_gold, squares, size);

    if (calculateWinner(squares, player_gold, size, player_num)) {
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
    
    const newWinner = calculateWinner(squares, nxt_gold, size, player_num);

    this.setState({
      cells: squares, 
      current_player: nextPlayer(current_player, player_num),
      player_gold: nxt_gold,
      winner: newWinner});
  }

  renderCell(i) {
    const {cells} = this.state;
    return (
      <Cell
        value={cells[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderStatus() {
    const {player_num} = this.props;
    const {current_player, player_gold, winner} = this.state;
    return (
      <Status
        player_num = {player_num}
        cur_player = {current_player}
        player_gold = {player_gold}
        winner = {winner}
      />
    );
  }

  render() {
    const {size, player_num} = this.props;
    const {current_player, player_gold, winner} = this.state;
    
    let prebuild_board = prebuildBoard(size);

    return (
      <div>
        {(this.renderStatus())}
        <br></br>
        {
          prebuild_board.map(board_row => (
            <div className="board-row">
              { board_row.map(index => (this.renderCell(index))) }
            </div>
          ))
        } 
      </div>
    );
  }
}

function prebuildBoard(size) {
    let empty_board = [];
    let cnt = 0;

    for (let i = 0; i < size; i++) {
      empty_board[i] = [];
      for (let j = 0; j < size; j++) {
        empty_board[i][j] = cnt++;
      }
    }

    return empty_board;
}

export default Board;
