import React, {Component} from 'react';
import 'url-search-params-polyfill';

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
      const url = new URL(window.location);
      let params = new URLSearchParams(url.search);
      let coins = data;
      let coinsToConvert = [];
      for(let pair of params.entries()) {
        const symbol = pair[0].replace(/_amount/gi, '').toUpperCase();
        if (symbol in coins) {
          coinsToConvert.push(this.getCoinInfo(coins[symbol], pair[1], this.state.currency))
        }
      }

      this.setState((prev, props) => ({coins: coins, coinsToConvert: coinsToConvert}));
    });
  }

  render() {
    const coins = Object.values(this.state.coins);

    if (coins.length === 0) {
      return (
        <div className="App">Loading coin data...</div>
      )
    }

    return (
      <div className="App">
        <AddCoin coins={coins}
                 onChange={this.handleCoinAdd} />
        <CoinList coins={this.state.coinsToConvert} />
      </div>
    );
  }

  getCoinInfo(coin, amount, currency) {
    return  {
      label: coin.name,
      symbol: coin.symbol,
      amount: amount,
      price: coin.price[currency],
      // @todo: replace with function, so that implementing support for more
      // currencies is easier.
      currency: currency.toUpperCase()
    };
  }

  handleCoinAdd = (coinSymbol, amount) => {
    this.setState((prevState, props) => {
      // Remove the coin that is about to be added from the available coins to
      // add.
      let coins = {...prevState.coins};
      delete coins[coinSymbol];

      // Get the coin that should be added.
      const coin = prevState.coins[coinSymbol];

      // Append the the new coin to the url, so that users can bookmark the
      // site and retrieve and thus save/bookmark the settings.
      // @todo: Add polyfill for URL.
      const url = new URL(window.location);
      let params = new URLSearchParams(url.search);
      params.append(coin.queryParam, amount);
      window.history.replaceState('', '', `?${params.toString()}`);

      // Return a new state with the new coin added to coinsToConvert list and
      // removed from the coins available object.
      return {
        coinsToConvert: [...prevState.coinsToConvert, this.getCoinInfo(coin, amount, prevState.currency)],
        coins: coins
      }
    })
  }
}

export default App;
