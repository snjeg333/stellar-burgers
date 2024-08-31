import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

interface ConstructorState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

export const initialState: ConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        const { items } = state;
        if (payload.type === 'bun') {
          items.bun = payload;
        } else {
          items.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient: (
      state,
      { payload: { id } }: PayloadAction<{ id: string }>
    ) => {
      const { items } = state;
      items.ingredients = items.ingredients.filter(
        (ingredient) => ingredient.id !== id
      );
    },
    clearIngredients: (state) => {
      state.items.bun = null;
      state.items.ingredients = [];
    },
    moveIngredientUp: (state, { payload }: PayloadAction<number>) => {
      const { items } = state;
      const index = payload;
      if (index > 0 && index < items.ingredients.length) {
        const temp = items.ingredients[index];
        items.ingredients[index] = items.ingredients[index - 1];
        items.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, { payload }: PayloadAction<number>) => {
      const { items } = state;
      const index = payload;
      if (index >= 0 && index < items.ingredients.length - 1) {
        const temp = items.ingredients[index];
        items.ingredients[index] = items.ingredients[index + 1];
        items.ingredients[index + 1] = temp;
      }
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
