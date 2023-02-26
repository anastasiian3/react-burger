import { RootState } from '../services/types';

export const getOrders = (state: RootState) => state.wsReducer.data.orders;
export const getAllIngredients = (state: RootState) => state.ingredientsReducer.ingredients;

export const getConstructorIngredients = (state: RootState) => state.constructorReducer;
export const getIngredientsDetailedInfo = (state: RootState) => state.ingredientsReducer;

export const isUserAuth = (state: RootState) => state.userAuthReducer.isAuth;
export const getUserName = (state: RootState) => state.userAuthReducer.user.name;
export const getDetailedUser = (state: RootState) => state.userAuthReducer.user;

export const isPasswordResetSuccessful = (state: RootState) => state.userAuthReducer.resetPasswordSuccess;
