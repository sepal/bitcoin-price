import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {getCoinParams, getParam} from './utility/url_settings';

const defaultCoins = getCoinParams();

ReactDOM.render(<App
  defaultCoins={defaultCoins}
  defaultCurrency={getParam('currency')} />,
  document.getElementById('root')
);

registerServiceWorker();
