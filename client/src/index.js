import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
//import "antd/dist/antd.css";
import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = `${localStorage.getItem("token")}`;
  config.headers.Authorization = token;

  return config;
});

const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem("token"),
    },
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
