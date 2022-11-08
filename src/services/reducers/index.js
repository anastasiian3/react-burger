import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { modalReducer } from './ingredient-details';
import { orderReducer } from './order-details';

export const rootReducers = combineReducers({
  ingredientsReducer,
  modalReducer,
  constructorReducer,
  orderReducer,
});
