import React, {Component} from 'react'


/**
 * Form that allows to add a new coin for conversion.
 */
class AddCoin extends Component {


  constructor(props) {
    super(props);

    // Set a default coin, if the coins prop isn't empty, otherwise set it to
    // undefined and wait for the next prop update to set a default coin.
    const defaultCoin = props.coins.length > 0 ?
      props.coins[0].symbol : undefined;

    this.state = {
      coin: defaultCoin,
      amount: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    // If new props with coins was passed, and our currency is still
    // empty, then set the first coin as default.
    if (nextProps.coins.length > 0 && this.coin === undefined) {
      this.setState((prevState, props) => ({
        coin: props.coins[0].symbol
      }));
    }
  }

  render() {
    // Construct a variable which will contain all coin options.
    const coins = this.props.coins.map((coin, i) => {
      return (
        <option value={coin.symbol} key={i}>
          {`${coin.name} (${coin.symbol})`}
        </option>
      );
    });

    return (
      <div>
        <select onChange={this.handleCoinChange}>
          {coins}
        </select>
        &nbsp;
        <input type="number" min="0.00" step="0.01" defaultValue="0"
               onChange={this.handleAmountChange} />
        &nbsp;
        <button onClick={this.handleAddClick}>Add</button>
      </div>
    );
  }

  /**
   * Handles coin form element changes.
   */
  handleCoinChange = (event) => {
    const val = event.target.value;
    this.setState((prev, props) => ({
      coin: val
    }));
  };

  /**
   * Handles amount form element changes.
   */
  handleAmountChange = (event) => {
    const val = event.target.value;
    this.setState((prev, props) => ({
      amount: val
    }));
  };

  /**
   * Handles add button clicks.
   */
  handleAddClick = (event) => {
    // If the coin state is set and a onChange function was passed to the
    // props, then call it with the coin and amount as parameters.
    if (this.state.coin !== undefined && 'onChange' in this.props) {
      this.props.onChange(this.state.coin, parseFloat(this.state.amount));
    }
  };
}

export default AddCoin;