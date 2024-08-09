import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authenticationSlice } from './authentication';
import { burgerIngredientsSlice } from './burgerIngredients';
import { orderFeedSlice } from './orderFeed';
import { burgerConstructorSlice } from './burgerConstructor';
import { orderManagementSlice } from './orderManagement';

const rootReducer = combineReducers({
  [authenticationSlice.name]: authenticationSlice.reducer,
  [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer,
  [orderFeedSlice.name]: orderFeedSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [orderManagementSlice.name]: orderManagementSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
