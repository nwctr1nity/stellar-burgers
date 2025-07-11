import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth-slice';
import detailsReducer from '../slices/details-slice';
import ordersReducer from '../slices/orders-slice';
import feedsReducer from '../slices/feeds-slice';
import constructorIngredientsReducer from '../slices/constructor-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  details: detailsReducer,
  orders: ordersReducer,
  feeds: feedsReducer,
  constructorIngredients: constructorIngredientsReducer
});

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
