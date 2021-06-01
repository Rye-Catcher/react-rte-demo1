import React, { Component } from 'react';
import './style/Cell.css';

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