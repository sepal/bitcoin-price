import React, {Component} from 'react';
import './App.css';
import {fetchCurrencies} from '../api';
import AddCurrency from './AddCurrency';

class App extends Component {
  state = {
    currencies: []
  };

  componentDidMount() {
    fetchCurrencies().then((data) => {
      this.setState((prev, props) => ({currencies: data}));
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <AddCurrency currencies={this.state.currencies}/>
        </div>
      </div>
    );
  }
}

export default App;
