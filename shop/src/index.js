import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // React의 로직이나 컴포넌트는 왜 두번실행되냐?
  // => 디버깅때매 두번실행되고 실제 release 되면 한번 실행됨
  // 그거 싫으면 <React.StrictMode> 이거 빼면 개발할때도 1번 실행됨
  // <React.StrictMode>
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
