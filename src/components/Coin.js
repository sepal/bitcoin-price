import React from 'react';
import "./Coin.css";

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
          (1 {props.symbol} = {props.price[props.currency]} {props.currency})
        </div>
      </div>
      <div className="coin__amount">
        {props.amount} {props.symbol}
      </div>
      <div className="coin__result">
        {props.value} {props.currency}
      </div>
    </li>
  );
}