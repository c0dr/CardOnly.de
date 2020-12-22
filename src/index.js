import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './CookieConsent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import App from './App';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();