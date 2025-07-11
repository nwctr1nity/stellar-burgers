import { RootState } from '../services/store';

export const getConstructorState = (state: RootState) =>
  state.constructorIngredients;
export const getFeedLoading = (state: RootState) => state.feeds.loading;
export const getFeedData = (state: RootState) => state.feeds;
export const getFeedOrders = (state: RootState) => state.feeds.orders;

export const getDetailsList = (state: RootState) => state.details.list;
export const getDetailsLoading = (state: RootState) => state.details.isLoading;

export const getOrderPending = (state: RootState) => state.orders.loading;
export const getOrderData = (state: RootState) => state.orders.currentOrder;
export const getUserOrders = (state: RootState) => state.orders.userOrders;

export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthLoading = (state: RootState) => state.auth.loading;
export const getAuthError = (state: RootState) => state.auth.error;
