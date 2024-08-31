import { authenticationSlice } from 'src/services/authentication';
import { burgerConstructorSlice } from 'src/services/burgerConstructor';
import { burgerIngredientsSlice } from 'src/services/burgerIngredients';
import { orderFeedSlice } from 'src/services/orderFeed';
import { orderManagementSlice } from 'src/services/orderManagement';
import { rootReducer } from 'src/services/store';

describe('rootReducer', () => {
  test('должен включать все редьюсеры', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      [authenticationSlice.name]: authenticationSlice.reducer(
        undefined,
        initAction
      ),
      [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer(
        undefined,
        initAction
      ),
      [orderFeedSlice.name]: orderFeedSlice.reducer(undefined, initAction),
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer(
        undefined,
        initAction
      ),
      [orderManagementSlice.name]: orderManagementSlice.reducer(
        undefined,
        initAction
      )
    });
  });
});

describe('rootReducer', () => {
  test('должен правильно обрабатывать неизвестные действия', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);
    expect(state).toEqual({
      [authenticationSlice.name]: authenticationSlice.reducer(
        undefined,
        unknownAction
      ),
      [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer(
        undefined,
        unknownAction
      ),
      [orderFeedSlice.name]: orderFeedSlice.reducer(undefined, unknownAction),
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer(
        undefined,
        unknownAction
      ),
      [orderManagementSlice.name]: orderManagementSlice.reducer(
        undefined,
        unknownAction
      )
    });
  });
});
