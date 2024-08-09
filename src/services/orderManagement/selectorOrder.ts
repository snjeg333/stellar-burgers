import { RootState } from '../store';

export const selectOrderRequestStatus = (state: RootState) =>
  state.orderManagement.isOrderRequesting;

export const selectCurrentOrderData = (state: RootState) =>
  state.orderManagement.currentOrderData;
