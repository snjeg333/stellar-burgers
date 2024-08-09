import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeed, fetchOrderByNumber } from './feedActions';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loadingData: boolean;
  previewOrder: TOrder | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loadingData: false,
  previewOrder: null
};

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    setFeedData: (
      state,
      {
        payload
      }: PayloadAction<{ orders: TOrder[]; total: number; totalToday: number }>
    ) => {
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
    setLoadingData: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingData = payload;
    },
    setPreviewOrder: (state, { payload }: PayloadAction<TOrder | null>) => {
      state.previewOrder = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(fetchFeed.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.loadingData = false;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.loadingData = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, { payload }) => {
        state.previewOrder = payload;
        state.loadingData = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.loadingData = false;
      });
  }
});

export const { setFeedData, setLoadingData, setPreviewOrder } =
  orderFeedSlice.actions;

export default orderFeedSlice.reducer;
