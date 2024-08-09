import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const placeBurgerOrder = createAsyncThunk(
  'order/placeBurgerOrder',
  async (ingredientIds: string[]) => {
    const { order } = await orderBurgerApi(ingredientIds);
    return order;
  }
);
