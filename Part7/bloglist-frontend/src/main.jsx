import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  a:visited {
    color: inherit;
    display: block;
    align-items: center;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </Provider>,
);
