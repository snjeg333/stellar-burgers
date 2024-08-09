import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { setAuthChecked, setUser } from './authSlice';

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    const token = getCookie('accessToken');
    if (token) {
      try {
        const { user } = await getUserApi();
        dispatch(setUser(user));
      } catch (error) {
        deleteCookie('accessToken');
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: TLoginData) => {
    const { accessToken, user } = await loginUserApi(credentials);
    setCookie('accessToken', accessToken);
    return user;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registrationData: TRegisterData) => {
    const { accessToken, user } = await registerUserApi(registrationData);
    setCookie('accessToken', accessToken);
    return user;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updatedData: Partial<TRegisterData>) => {
    const { user } = await updateUserApi(updatedData);
    return user;
  }
);

export const logoutUsers = createAsyncThunk('auth/logoutUsers', async () => {
  const { success } = await logoutApi();
  if (success) {
    deleteCookie('accessToken');
  }
});

export const fetchUserOrders = createAsyncThunk(
  'auth/fetchUserOrders',
  getOrdersApi
);
