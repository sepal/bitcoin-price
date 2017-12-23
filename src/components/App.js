import React, {Component} from 'react';
import {setUrlParam} from '../utility/url_settings'
import './App.css';
import {fetchCurrencies} from '../api';
import AddCoin from './AddCoin';
import CoinList from './CoinList';

class App extends Component {
  state = {
    coins: {},
    coinsAvailable: [],
    myCoins: [],
    currency: 'eur',
    total: 0,
  };

  componentDidMount() {
    // Fetch the currencies.
    fetchCurrencies().then((data) => {
      // Keep all the available coins in a separate list with name and symbol.
      let coinList = Object.values(data).map((coin) => ({
        symbol: coin.symbol,
        name: coin.name
      }));
      let myCoins = [];
      let total = 0;

      // Add all the coins added via props and remove them from the available
      // coins list.
      this.props.defaultCoins.forEach((amount, key) => {
        const symbol = key.replace(/_amount/gi, '').toUpperCase();
        if (symbol in data) {
          coinList = coinList.filter((coin) => coin.symbol !== symbol);

          const coin = this.prepareCoinToAdd(
            data[symbol],
            amount,
            this.state.currency
          );
          total += coin.value;

          myCoins.push(coin);
        }
      });
      console.log({
        coins: data,
        coinsAvailable: coinList,
        myCoins: myCoins,
        total: total
      });

      this.setState((prev, props) => ({
        coins: data,
        coinsAvailable: coinList,
        myCoins: myCoins,
        total: total
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

    return (
      <div className="App">
        <AddCoin coins={this.state.coinsAvailable}
                 onChange={this.handleCoinAdd} />
        <CoinList coins={this.state.myCoins} currency={this.state.currency}/>
        <div className="total">
          Total: {`${this.state.total} ${this.state.currency.toUpperCase()}`}
        </div>
      </div>
    );
  }

  prepareCoinToAdd(coin, amount, currency) {
    return {
      ...coin,
      amount: amount,
      value: amount * coin.price[currency]
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
      const coin = this.prepareCoinToAdd(
        prevState.coins[coinSymbol],
        amount,
        prevState.currency
      );

      // Append the the new coin to the url, so that users can bookmark the
      // site and retrieve and thus save/bookmark the settings.
      setUrlParam(coin.queryParam, amount);

      // Return a new state with the new coin added to myCoins list and
      // removed from the coins available object.
      return {
        myCoins: [...prevState.myCoins, coin],
        coinsAvailable: coinsAvailable,
        total: prevState.total + coin.value
      }
    })
  }
}

export default App;
