import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';
import './index.scss';

ReactDOM.render(
  <Provider store={configureStore()}>
   <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
