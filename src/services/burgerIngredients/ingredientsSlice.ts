import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './ingredientsActions';

interface IngredientsState {
  ingredients: TIngredient[];
  loadingData: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  loadingData: false
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    setIngredientsData: (
      state,
      { payload }: PayloadAction<{ ingredients: TIngredient[] }>
    ) => {
      state.ingredients = payload.ingredients;
    },
    setLoadingData: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingData = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.loadingData = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loadingData = false;
      });
  }
});

export const { setIngredientsData, setLoadingData } =
  burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
