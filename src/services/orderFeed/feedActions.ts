import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderByNumber = createAsyncThunk(
  'feeds/fetchOrderByNumber',
  async (orderNumber: number) => {
    const { orders } = await getOrderByNumberApi(orderNumber);
    return orders[0];
  }
);

export const fetchFeed = createAsyncThunk('feeds/getAll', getFeedsApi);
