import { RootState } from '../store';

export const selectIngredients = (state: RootState) =>
  state.burgerIngredients.ingredients;
export const selectLoadingData = (state: RootState) =>
  state.burgerIngredients.loadingData;
