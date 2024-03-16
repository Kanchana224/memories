import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";

import App from "./App";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; // Correct import statement
import reducers from "./reducers";

// Create Store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// Render App
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App component with Provider and pass store as prop */}
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
