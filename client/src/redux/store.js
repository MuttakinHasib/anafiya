import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/rootReducers';

const middleware = [thunk];
const initial = {};

export const store = createStore(
  reducers,
  initial,
  composeWithDevTools(applyMiddleware(...middleware))
);
