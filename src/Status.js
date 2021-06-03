import React, {Component} from 'react'
import './style/Status.css'
import { nextPlayer } from './helpers/BoardHelper.js'

class Status extends React.Component {
  render() {
    const {player_num, cur_player, player_gold, winner} = this.props;

    let nxt_player, gold_status, upgrade_dashboard;

    if (winner) {
      nxt_player = 'Winner: ' + winner;
    } else {
      nxt_player = 'Next player: ' + nextPlayer(cur_player, player_num);
    }

    gold_status = [];
    for (let i = 0; i < player_num; i++) {
      gold_status[i] = 'Player ' + String.fromCharCode(65 + i) + ' has ' 
        + player_gold[i].toString() + ' gold' + '\n';
    }

    upgrade_dashboard = "Need 25 golds to upgrade/build a building";

    return (
      <div>
        <div className="nxt-player">{nxt_player}</div>
        <div className="gold-status">
          {gold_status.map(gold_status_row => (
            <div class Nmae='gold-status-row'>
              {gold_status_row}
            </div>
          ))}
        </div>
        <div className="upgrade-dashboard">{upgrade_dashboard}</div>
      </div>
    );
  }
}

export default Status;