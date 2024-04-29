import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import ThemeProvider from './components/ThemeProvider.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { persistor } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </PersistGate>
  </React.StrictMode>,
)
