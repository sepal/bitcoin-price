import React from 'react';
import NumberFormat from 'react-number-format';
import "./Coin.css";


function getPriceComponent(price) {
  return <NumberFormat
    value={price}
    displayType={'text'}
    thousandSeparator={true}
    decimalScale={2}
  />;
}

/**
 * Renders the conversion between a crypto currency/coin and a traditional
 * currency.
 */
export default function (props) {
  console.log(props);
  return (
    <li className="coin">
      <div className="coin__name">
        <div>{props.name}</div>
        <div>
          (1 {props.symbol} = {getPriceComponent(props.price[props.currency])} {props.currency.toUpperCase()})
        </div>
      </div>
      <div className="coin__amount">
        {getPriceComponent(props.amount)}
        &nbsp;{props.symbol}
      </div>
      <div className="coin__result">
        {
          getPriceComponent(props.value)
        }
        &nbsp;{props.currency.toUpperCase()}
      </div>
    </li>
  );
}