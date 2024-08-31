import { TOrder } from '@utils-types';
import {
  initialState,
  orderManagementSlice,
  placeBurgerOrder
} from 'src/services/orderManagement';

type OrderState = typeof initialState;
type OrderAction = {
  type: string;
  payload?: TOrder;
  error?: { message: string };
};

describe('срез заказов', () => {
  const mock: TOrder = {
    _id: '1',
    status: 'ok',
    name: 'bun',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: ['']
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testStateChange = (
    actionType: string,
    expectedState: OrderState,
    testName: string
  ) => {
    test(`должен изменить состояние на ${testName}`, () => {
      const action: OrderAction = {
        type: actionType,
        payload:
          actionType === placeBurgerOrder.fulfilled.type ? mock : undefined,
        error:
          actionType === placeBurgerOrder.rejected.type
            ? { message: 'Ошибка при создании заказа' }
            : undefined
      };
      const newState = orderManagementSlice.reducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  };

  testStateChange(
    placeBurgerOrder.pending.type,
    {
      isOrderRequesting: true,
      currentOrderData: null,
      error: null
    },
    'pending'
  );

  testStateChange(
    placeBurgerOrder.fulfilled.type,
    {
      isOrderRequesting: false,
      currentOrderData: mock,
      error: null
    },
    'fulfilled'
  );

  testStateChange(
    placeBurgerOrder.rejected.type,
    {
      isOrderRequesting: false,
      currentOrderData: null,
      error: 'Ошибка при создании заказа'
    },
    'rejected'
  );
});
