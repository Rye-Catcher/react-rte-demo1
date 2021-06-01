import React, { Component } from 'react';
import './style/Board.css';
import Cell from './Cell.js';
import { calculateWinner, calculateProfit, nextPlayer, prebuildBoard } from './helpers/BoardHelper.js';

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
      player_gold: Array(player_num).fill(25)
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
    
    this.setState({
      cells: squares, 
      current_player: nextPlayer(current_player, player_num),
      player_gold: nxt_gold});
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

  render() {
    const {size, player_num} = this.props;
    const {cells, current_player, player_gold} = this.state;
    
    const winner = calculateWinner(cells, player_gold, size, player_num);
    let nxt_player, gold_dashboard, upgrade_dashboard;

    if (winner) {
      nxt_player = 'Winner: ' + winner;
    } else {
      nxt_player = 'Next player: ' + nextPlayer(current_player, player_num)
    }

    gold_dashboard = 'Player A has ' + player_gold[0].toString() + ' gold'
      + ', ' + 'Player B has ' + player_gold[1].toString() + ' gold';

    upgrade_dashboard = "Need 25 golds to upgrade/build a building";

    let prebuild_board = prebuildBoard(size);

    return (
      <div>
        <div className="nxt_player">{nxt_player}</div>
        <div className="gold_dashboard">{gold_dashboard}</div>
        <div className="upgrade_dashboard">{upgrade_dashboard}</div>
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

export default Board;
