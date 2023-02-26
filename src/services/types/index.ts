import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../index';
import { TConstructorActions } from '../actions/burger-constructor';
import { TIngredientsActions } from '../actions/burger-ingredients';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import { TOrderDetailsActions } from '../actions/order-details';
import { TUserAuthActions } from '../actions/user-authentication';
import { TWsActions } from '../actions/web-socket';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducers } from '../reducers';

type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TIngredientDetailsActions
  | TOrderDetailsActions
  | TUserAuthActions
  | TWsActions;

export type RootState = ReturnType<typeof rootReducers>;
//export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useOwnDispatch = () => useDispatch<TypedDispatch>();
export const useOwnSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
