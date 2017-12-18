import React, {Component} from 'react'


/**
 * Form that allows to add a new currency.
 */
class AddCurrency extends Component {
  state = {
    currency: undefined,
    amount: 0
  };

  componentWillReceiveProps(nextProps) {
    // if new props with currencies was passed, and our currency is still
    // empty, then set the first currency as default.
    if (nextProps.currencies.length > 0 && this.currency === undefined) {
      this.setState((prevState, props) => ({
        currency: props.currencies[0].symbol
      }));
    }
  }

  render() {
    // Construct a variable which will contain all currencies.
    const currencies = this.props.currencies.map((currency, i) => {
      return (
        <option value={currency.symbol} key={i}>
          {`${currency.name} (${currency.symbol})`}
        </option>
      );
    });

    return (
      <div>
        <select onChange={this.handleCurrencyChange}>
          {currencies}
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
   * Handles currency form element changes.
   */
  handleCurrencyChange = (event) => {
    this.setState((prev, props) => ({
      currency: event.value
    }));
  };

  /**
   * Handles amount form element changes.
   */
  handleAmountChange = (event) => {
    this.setState((prev, props) => ({
      amount: event.value
    }));
  };

  /**
   * Handles add button clicks.
   */
  handleAddClick = (event) => {
    // If the currency is set and a onChange function was passed to the props,
    // then call it with the currency and amount as parameters.
    if (this.state.currency !== undefined && 'onChange' in this.props) {
      this.props.onChange(this.state.currency, this.state.amount);
    }
  };
}

export default AddCurrency;