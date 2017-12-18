import React from 'react';
import Coin from './Coin';

export default function (props) {
  const currencies = props.coins.map((coin, i) => <Coin {...coin} key={i}/>);
  return (
    <ul>
      {currencies}
    </ul>
  );
}