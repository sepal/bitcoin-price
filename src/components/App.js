import React, {Component} from 'react';
import './App.css';
import {fetchCurrencies} from '../api';
import AddCurrency from './AddCurrency';

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
          <AddCurrency currencies={Object.values(this.state.coins)}/>
        </div>
      </div>
    );
  }
}

export default App;
