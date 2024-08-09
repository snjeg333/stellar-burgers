import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { placeBurgerOrder } from './orderActions';

interface ManagementState {
  isOrderRequesting: boolean;
  currentOrderData: TOrder | null;
  error: string | null;
}

const initialState: ManagementState = {
  isOrderRequesting: false,
  currentOrderData: null,
  error: null
};

export const orderManagementSlice = createSlice({
  name: 'orderManagement',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.currentOrderData = null;
      state.isOrderRequesting = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeBurgerOrder.pending, (state) => {
        state.isOrderRequesting = true;
        state.error = null;
      })
      .addCase(
        placeBurgerOrder.fulfilled,
        (state, { payload }: PayloadAction<TOrder>) => {
          state.currentOrderData = payload;
          state.isOrderRequesting = false;
        }
      )
      .addCase(placeBurgerOrder.rejected, (state, { error }) => {
        state.isOrderRequesting = false;
        state.error = error.message || 'Ошибка при создании заказа';
      });
  }
});

export const { clearOrderData } = orderManagementSlice.actions;

export default orderManagementSlice.reducer;
