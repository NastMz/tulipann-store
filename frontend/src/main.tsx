import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './redux/store/store';
import {createRoot} from "react-dom/client";

/**
 * Renders the root React component in the DOM.
 *
 * @param {HTMLElement} rootElement - The root element to render the component in.
 */
function render(rootElement: any) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
}

render(document.getElementById('root'));
