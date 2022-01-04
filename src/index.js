import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ScoreProvider } from './contexts/ScoreContext';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-or69iw65.us.auth0.com"
    clientId="UM4LTqhHPwCr6RbWAKPMTEml6aX2uDZz"
    redirectUri={window.location.origin}
    audience="https://typinggameapi"
  >
  <ScoreProvider>
    <App />
  </ScoreProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
