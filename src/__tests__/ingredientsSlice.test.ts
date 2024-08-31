import { TIngredient } from '@utils-types';

import { PayloadAction } from '@reduxjs/toolkit';
import {
  burgerIngredientsSlice,
  getIngredients,
  initialState
} from 'src/services/burgerIngredients';

interface FulfilledActionPayload {
  ingredients: TIngredient[];
}

describe('Редьюсер слайса ингредиентов', () => {
  const mock: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testReducer = (
    actionType: string,
    expectedState: any,
    payload: any = mock
  ) => {
    test(`должен установить состояние при выполнении действия "${actionType}"`, () => {
      let action: PayloadAction<any>;
      if (actionType === getIngredients.fulfilled.type) {
        action = {
          type: actionType,
          payload
        } as PayloadAction<FulfilledActionPayload>;
      } else {
        action = { type: actionType } as PayloadAction<any>;
      }

      const newState = burgerIngredientsSlice.reducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  };

  testReducer(getIngredients.pending.type, {
    ingredients: [],
    loadingData: true
  });

  testReducer(getIngredients.fulfilled.type, {
    ingredients: mock,
    loadingData: false
  });

  testReducer(getIngredients.rejected.type, {
    ingredients: [],
    loadingData: false
  });
});
