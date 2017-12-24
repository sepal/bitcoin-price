import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import {setUrlParam, removeUrlParam} from '../utility/url_settings'
import './App.css';
import {fetchCurrencies} from '../api';
import AddCoin from './AddCoin';
import CoinList from './CoinList';
import CurrencySelector from './CurrencySelector';

class App extends Component {
  state = {
    coins: {},
    coinsAvailable: [],
    myCoins: [],
    currency: 'eur',
    total: 0,
    currencies: ['eur', 'usd']
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

      const currency = this.props.defaultCurrency ? this.props.defaultCurrency
        : this.state.currency;
      console.log(currency);

      // Add all the coins added via props and remove them from the available
      // coins list.
      this.props.defaultCoins.forEach((amount, key) => {
        const symbol = key.replace(/_amount/gi, '').toUpperCase();
        if (symbol in data) {
          coinList = coinList.filter((coin) => coin.symbol !== symbol);

          const coin = this.prepareCoinToAdd(
            data[symbol],
            amount,
            currency
          );
          myCoins.push(coin);
        }
      });

      this.setState((prev, props) => ({
        coins: data,
        coinsAvailable: coinList,
        myCoins: myCoins,
        total: this.calcTotal(myCoins),
        currency: currency
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
        <CurrencySelector currencies={this.state.currencies}
                          defaultValue={this.state.currency}
                          onChange={this.handleCurrencySelect}/>
        <AddCoin coins={this.state.coinsAvailable}
                 onChange={this.handleCoinAdd} />
        <CoinList coins={this.state.myCoins} currency={this.state.currency}
                  onRemove={this.handleCoinRemove} />
          <div className="total">
            Total: <NumberFormat
            value={this.state.total}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
          />
          &nbsp;{this.state.currency.toUpperCase()}
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

  calcTotal(coins) {
    if (coins.length > 0) {
      return coins.reduce((acc, coin) => ({
        value: acc.value + coin.value
      })).value;
    }
    return 0
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

      const newMyCoins = [...prevState.myCoins, coin];

      // Append the the new coin to the url, so that users can bookmark the
      // site and retrieve and thus save/bookmark the settings.
      setUrlParam(coin.queryParam, amount);

      // Return a new state with the new coin added to myCoins list and
      // removed from the coins available object.
      return {
        myCoins: newMyCoins,
        coinsAvailable: coinsAvailable,
        total: this.calcTotal(newMyCoins)
      }
    });
  };

  handleCoinRemove = (coinToRemove) => {
    this.setState((prevState, props) => {
      const myCoins = prevState.myCoins.filter((coin) => coin.symbol !== coinToRemove.symbol);

      const coinAvailable = {
        symbol: coinToRemove.symbol,
        name: coinToRemove.name
      };

      removeUrlParam(coinToRemove.queryParam);

      return {
        myCoins: myCoins,
        coinsAvailable: [...prevState.coinsAvailable, coinAvailable],
        total: this.calcTotal(myCoins)
      };
    });
  };

  handleCurrencySelect = (currency) => {
    this.setState((prevState, props) => {
      const myCoins = prevState.myCoins.map((coin) => {
        return this.prepareCoinToAdd(coin, coin.amount, currency);
      });

      setUrlParam('currency', currency);

      return {
        myCoins: myCoins,
        currency: currency,
        total: this.calcTotal(myCoins)
      };
    });
  }
}

export default App;
