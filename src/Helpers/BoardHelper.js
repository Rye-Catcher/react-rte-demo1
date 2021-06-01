import React from 'react';

export function calculateWinner(cells, player_gold, size, player_num) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = i * size + j;
      if (!cells[index]) {
        return null;
      }
    }
  }

  let max = -1, index = 0;
  for (let i = 0; i < player_num; i++) {
    if (player_gold[i] > max) {
      max = player_gold[i];
      index = i;
    }
  }

  return String.fromCharCode(65 + index);
}

export function calculateProfit(cur_gold, cells, size) {
  let nxt_gold = cur_gold.slice();
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = i * size + j;
      if(cells[index]) {
        nxt_gold[cells[index][0].charCodeAt(0) - 65] 
          += 15 * (cells[index][1].valueOf()); 
      }
    }
  }
  return nxt_gold;
}

export function nextPlayer(cur_player, player_num) {
  if (player_num - 1 === (cur_player.charCodeAt(0) - 65)) {
    return 'A';
  } else {
    return String.fromCharCode(cur_player.charCodeAt(0) + 1);
  }
}

export function prebuildBoard(size) {
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