import { RootState } from '../store';

export const selectIsAuthChecked = (state: RootState) =>
  state.authentication.isAuthChecked;
export const selectUserOrderList = (state: RootState) =>
  state.authentication.userOrderList;
export const selectLoadingData = (state: RootState) =>
  state.authentication.loadingData;
export const selectError = (state: RootState) => state.authentication.error;
export const selectUser = (state: RootState) => state.authentication.user;
