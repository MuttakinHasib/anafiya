import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/rootReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const middleware = [thunk];
const initial = {
  userLogin: { user: userInfoFromStorage },
};

export const store = createStore(
  reducers,
  initial,
  composeWithDevTools(applyMiddleware(...middleware))
);
