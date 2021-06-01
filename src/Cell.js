import React, { Component } from 'react';
import './Cell.css';

class Cell extends React.Component {
  render() {
    const {value} = this.props;
    return (
      <button className="cell" onClick={this.props.onClick}>
        {value}
      </button>
    );
  }
}

export default Cell;