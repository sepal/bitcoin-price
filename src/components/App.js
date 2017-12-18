import React, {Component} from 'react';
import './App.css';
import {fetchCurrencies} from '../api';
import AddCoin from './AddCoin';
import CoinList from './CoinList';

class App extends Component {
  state = {
    coins: {},
    coinsToConvert: [],
    currency: 'eur'
  };

  componentDidMount() {
    fetchCurrencies().then((data) => {
      this.setState((prev, props) => ({coins: data}));
    })
  }

  render() {
    return (
      <div className="App">
        <AddCoin coins={Object.values(this.state.coins)}
                 onChange={this.handleCoinAdd} />
        <CoinList coins={this.state.coinsToConvert} />
      </div>
    );
  }

  handleCoinAdd = (coinSymbol, amount) => {
    this.setState((prevState, props) => {
      let coins = {...prevState.coins};
      delete coins[coinSymbol];

      return {
        coinsToConvert: [...prevState.coinsToConvert, {
          label: prevState.coins[coinSymbol].label,
          symbol: prevState.coins[coinSymbol].symbol,
          amount: amount,
          price: prevState.coins[coinSymbol].price[prevState.currency],
          // @todo: replace with function, so that implementing support for more
          // currencies is easier.
          currency: prevState.currency.toUpperCase()
        }],
        coins: coins
      }
    })
  }
}

export default App;
