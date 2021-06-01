import React, { Component } from 'react';
import Game from './Game';
import './style/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Rebuild the Empire Demo</h1>
                <Game />
            </div>
        );
    }
}

export default App;