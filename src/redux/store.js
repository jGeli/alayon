import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducers/data.reducer';
import customerReducer from './reducers/customer.reducer';
import authReducer from './reducers/auth.reducer';
import uiReducer from './reducers/ui.Reducer';

const rootReducer = combineReducers({
  customer: customerReducer,
  data: dataReducer,
  auth: authReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
