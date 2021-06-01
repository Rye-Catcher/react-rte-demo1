import React, { Component } from 'react';
import Board from './Board.js';
import './Game.css';

const SIZE = 4;
const PLAYER_NUM = 2; 

class Game extends React.Component {
  constructor(props) {
        super(props);
        this.size = SIZE;
        this.player_num = PLAYER_NUM;
    }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board size = {this.size} player_num = {this.player_num} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
