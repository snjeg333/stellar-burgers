import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructorSlice.items;
