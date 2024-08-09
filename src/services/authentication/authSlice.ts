import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  fetchUserOrders,
  loginUser,
  logoutUsers,
  registerUser,
  updateUser
} from './authActions';

interface UserState {
  user: TUser | null;
  userOrderList: TOrder[];
  isAuthChecked: boolean;
  loadingData: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  userOrderList: [],
  isAuthChecked: false,
  loadingData: false,
  error: null
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthChecked: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthChecked = payload;
    },
    setLoadingData: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingData = payload;
    },
    setUser: (state, { payload }: PayloadAction<TUser | null>) => {
      state.user = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
    clearUserData: (state) => {
      state.user = null;
      state.userOrderList = [];
      state.isAuthChecked = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = error.message || 'Ошибка при входе';
        state.loadingData = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthChecked = true;
        state.loadingData = false;
      })
      .addCase(logoutUsers.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.loadingData = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message || 'Ошибка при регистрации';
        state.loadingData = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthChecked = true;
        state.loadingData = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message || 'Ошибка при обновлении данных';
        state.loadingData = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadingData = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, { error }) => {
        state.error = error.message || 'Ошибка при получении заказов';
        state.loadingData = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
        state.userOrderList = payload;
        state.loadingData = false;
      });
  }
});

export const {
  setAuthChecked,
  setUser,
  setLoadingData,
  setError,
  clearUserData
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
