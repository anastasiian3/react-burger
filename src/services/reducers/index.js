import { combineReducers } from 'redux';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { modalReducer } from './ingredient-details';
import { orderReducer } from './order-details';
import { userAuthReducer } from './user-authentication';

export const rootReducers = combineReducers({
  ingredientsReducer,
  modalReducer,
  constructorReducer,
  orderReducer,
  userAuthReducer,
});
