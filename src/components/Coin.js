import React from 'react';
import "./Coin.css";

/**
 * Renders the conversion between a crypto currency/coin and a traditional
 * currency.
 */
export default function (props) {
  return (
    <li className="coin">
      <div className="coin__name">
        <div>{props.label}</div>
        <div>
          (1 {props.symbol} = {props.price} {props.currency})
        </div>
      </div>
      <div className="coin__amount">
        {props.amount} {props.symbol}
      </div>
      <div className="coin__result">
        {props.amount * props.price} {props.currency}
      </div>
    </li>
  );
}