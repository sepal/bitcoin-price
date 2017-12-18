import React, {Component} from 'react';
import './App.css';
import {fetchCurrencies} from '../api';
import AddCoin from './AddCoin';

class App extends Component {
  state = {
    coins: {}
  };

  componentDidMount() {
    fetchCurrencies().then((data) => {
      this.setState((prev, props) => ({coins: data}));
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <AddCoin coins={Object.values(this.state.coins)}/>
        </div>
      </div>
    );
  }
}

export default App;
