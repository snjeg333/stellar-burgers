import { RootState } from '../store';

export const selectOrders = (state: RootState) => state.orderFeed.orders;
export const selectLoadingStatus = (state: RootState) =>
  state.orderFeed.loadingData;
export const selectTotal = (state: RootState) => state.orderFeed.total;
export const selectTotalTodayOrders = (state: RootState) =>
  state.orderFeed.totalToday;
export const selectPreviewOrder = (state: RootState) =>
  state.orderFeed.previewOrder;
export const selectFeedState = (state: RootState) => state.orderFeed;
