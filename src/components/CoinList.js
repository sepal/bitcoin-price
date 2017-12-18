import React from 'react';
import Coin from './Coin';

export default function (props) {
  const currencies = props.coins.map((coin) => <Coin {...coin}/>);
  return (
    <ul>
      {currencies}
    </ul>
  );
}