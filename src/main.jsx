import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css';
import './index.css'
import { store, StoreContext } from '../src/store/store.js'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
)
