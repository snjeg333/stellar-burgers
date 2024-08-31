import { PayloadAction } from '@reduxjs/toolkit';

import { TConstructorIngredient } from '@utils-types';
import {
  addIngredient,
  burgerConstructorSlice,
  clearIngredients,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from 'src/services/burgerConstructor';

interface ConstructorState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const mock: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0948',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
    id: '1'
  },
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
    id: '2'
  },
  {
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    id: '3'
  }
];

jest.mock('uuid', () => ({ v4: () => '1' }));

describe('Тестирование конструктора бургера', () => {
  let initialState: ConstructorState;

  beforeEach(() => {
    initialState = {
      items: { bun: null, ingredients: [...mock] }
    } as ConstructorState;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('должен корректно добавлять ингредиент в конструктор', () => {
    const newState = burgerConstructorSlice.reducer(
      { items: { bun: null, ingredients: [] } } as ConstructorState,
      addIngredient(mock[0])
    );

    expect(newState.items.ingredients).toHaveLength(1);
    expect(newState.items.ingredients[0]).toEqual(mock[0]);
  });

  test('должен корректно удалять ингредиент из конструктора', () => {
    const ingredientIdToRemove = mock[0].id;
    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient({ id: ingredientIdToRemove })
    );

    expect(newState.items.ingredients).toHaveLength(2);
    expect(newState.items.ingredients).toEqual(mock.slice(1));
  });

  test('должен очищать ингредиенты', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      clearIngredients()
    );

    expect(newState.items.bun).toBeNull();
    expect(newState.items.ingredients).toHaveLength(0);
  });

  describe('перемещение ингредиентов', () => {
    const testMove = (
      action: PayloadAction<number>,
      initialIngredients: TConstructorIngredient[],
      expectedIngredients: TConstructorIngredient[]
    ) => {
      const newState = burgerConstructorSlice.reducer(
        {
          items: { bun: null, ingredients: initialIngredients }
        } as ConstructorState,
        action
      );

      expect(newState.items.ingredients).toEqual(expectedIngredients);
    };

    test('должен корректно перемещать ингредиент вверх', () => {
      const ingredients = [...mock];
      testMove(moveIngredientUp(1), ingredients, [
        ingredients[1],
        ingredients[0],
        ingredients[2]
      ]);
    });

    test('должен корректно перемещать ингредиент вниз', () => {
      const ingredients = [...mock];
      testMove(moveIngredientDown(0), ingredients, [
        ingredients[1],
        ingredients[0],
        ingredients[2]
      ]);
    });

    test('не должен перемещать ингредиент вверх, если он уже на верхней позиции', () => {
      const ingredients = [...mock];
      const newState = burgerConstructorSlice.reducer(
        { items: { bun: null, ingredients } } as ConstructorState,
        moveIngredientUp(0)
      );

      expect(newState.items.ingredients).toEqual(ingredients);
    });

    test('не должен перемещать ингредиент вниз, если он уже на нижней позиции', () => {
      const ingredients = [...mock];
      const newState = burgerConstructorSlice.reducer(
        { items: { bun: null, ingredients } } as ConstructorState,
        moveIngredientDown(2)
      );

      expect(newState.items.ingredients).toEqual(ingredients);
    });
  });
});
