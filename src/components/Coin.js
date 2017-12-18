import React from 'react';

/**
 * Renders the conversion between a crypto currency/coin and a traditional
 * currency.
 */
export default function (props) {
  console.log(props.amount);
  console.log(props.price);
  return (
    <li className="coin">
      <div className="coin__name">
        <div>{props.label}</div>
        <div>
          (1 {props.symbol} = {props.price} {props.currency})
        </div>
      </div>
      <div className="coin__amount">
        {props.amount * props.price} {props.symbol}
      </div>
      <div className="coin__result">
        {props.result} {props.currency}
      </div>
    </li>
  );
}