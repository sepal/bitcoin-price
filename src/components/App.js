import React, {Component} from 'react';
import {getAllUrlParams, setUrlParam} from '../utility/url_settings'
import './App.css';
import {fetchCurrencies} from '../api';
import AddCoin from './AddCoin';
import CoinList from './CoinList';

class App extends Component {
  state = {
    coins: {},
    coinsAvailable: [],
    myCoins: [],
    currency: 'eur'
  };

  componentDidMount() {
    fetchCurrencies().then((data) => {
      let coinsAvailable = Object.values(data).map((coin) => ({
        symbol: coin.symbol,
        name: coin.name
      }));
      let myCoins = [];


      for(let pair of getAllUrlParams()) {
        const symbol = pair[0].replace(/_amount/gi, '').toUpperCase();
        if (symbol in data) {
          myCoins.push(this.getCoinInfo(data[symbol], pair[1], this.state.currency));
          coinsAvailable = coinsAvailable.filter((item) => {
            return item.symbol !== symbol;
          });
        }
      }

      this.setState((prev, props) => ({
        coins: data,
        coinsAvailable: coinsAvailable,
        myCoins: myCoins
      }));
    });
  }

  render() {
    const coins = Object.values(this.state.coins);

    if (coins.length === 0) {
      return (
        <div className="App">Loading coin data...</div>
      )
    }

    let sum = 0;
    this.state.myCoins.forEach((coin) => {
      sum += coin.amount * coin.price;
    });

    return (
      <div className="App">
        <AddCoin coins={this.state.coinsAvailable}
                 onChange={this.handleCoinAdd} />
        <CoinList coins={this.state.myCoins} />
        <div className="total">
          Total: {`${sum} ${this.state.currency.toUpperCase()}`}
        </div>
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
      const coinsAvailable = prevState.coinsAvailable.filter((item) => {
         return item.symbol !== coinSymbol;
      });

      // Get the coin that should be added.
      const coin = prevState.coins[coinSymbol];

      // Append the the new coin to the url, so that users can bookmark the
      // site and retrieve and thus save/bookmark the settings.
      setUrlParam(coin.queryParam, amount);

      // Return a new state with the new coin added to myCoins list and
      // removed from the coins available object.
      return {
        myCoins: [...prevState.myCoins, this.getCoinInfo(coin, amount, prevState.currency)],
        coinsAvailable: coinsAvailable
      }
    })
  }
}

export default App;
