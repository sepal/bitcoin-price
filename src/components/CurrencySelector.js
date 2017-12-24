import React, {Component} from 'react';
import "./CurrencySelector.css";

class CurrencySelector extends Component {

  render() {
    const currency_radios = this.props.currencies.map((currency, i) => {
      const id = `currency-selector__${currency}`;
      let checked = false;
      if (this.props.defaultValue === currency) {
        checked = true;
      }

      return (
        <li className="currency-selector__currency" key={currency}>
          <input type="radio" id={id} name='currency' value={currency}
                 onChange={this.handleChange} defaultChecked={checked} />&nbsp;
          <label htmlFor="{id}">{currency.toUpperCase()}</label>
        </li>
      );
    });

    return (
      <ul className="currency-selector">
        {currency_radios}
      </ul>
    )
  }

  handleChange = (event) => {
    if (this.props.onChange) {
      return this.props.onChange(event.target.value);
    }
  }
}

export default CurrencySelector;