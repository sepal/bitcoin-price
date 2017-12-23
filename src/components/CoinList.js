import React from 'react';
import Coin from './Coin';
import "./CoinList.css"

export default function (props) {
  const currencies = props.coins.map((coin, i) =>
    <Coin {...coin} key={i} currency={props.currency} onRemove={props.onRemove}/>);
  return (
    <ul className="coin-list">
      {currencies}
    </ul>
  );
}