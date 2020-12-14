import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./users/userReducer";
import cartReducer from "./Cart/cartReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
