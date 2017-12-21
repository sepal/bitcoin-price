import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {getAllUrlParams} from './utility/url_settings';

const defaultCoins = getAllUrlParams();

ReactDOM.render(<App defaultCoins={defaultCoins} />, document.getElementById('root'));
registerServiceWorker();
