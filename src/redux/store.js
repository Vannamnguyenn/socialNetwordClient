import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";

import rootReducer from "./reducers/index";

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk))
);

const DataProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default DataProvider;
