import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import Store from './Store/Store.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}> {/* ✅ Redux store must be inside Provider */}
      <App />
    </Provider>
  </StrictMode>
);
