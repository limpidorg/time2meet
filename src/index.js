import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "tailwindcss/dist/tailwind.min.css";
import "./index.css";

import { API } from "./t2m"

API.request('login', {
  email: 't2m@yyjlincoln.app',
  password: 'password'
}).then(res => {
  alert(res.user.userName)
})

API.endpoint('login')({
  email: "t2m@yyjlincoln.app",
  password: "password"
}).then(res => {
  alert(res.user.userName)
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
