import { TUser, TOrder } from '@utils-types';
import {
  loginUser,
  logoutUsers,
  registerUser,
  updateUser,
  fetchUserOrders
} from '../services/authentication/authActions';
import {
  authenticationSlice,
  initialState,
  UserState
} from '../services/authentication/authSlice';

describe('Тестирование слайса аутентификации', () => {
  let mockUserData: TUser;
  let mock: TOrder[];
  let mockStatePending: UserState;
  let mockStateFulfilled: UserState;
  let mockStateOrdersFulfilled: UserState;
  let mockStateRejected: UserState;

  beforeEach(() => {
    mockUserData = {
      email: 'nfs@mail.com',
      name: 'NFS'
    };

    mock = [
      {
        _id: '6',
        status: 'done',
        number: 50875,
        name: 'Бургер',
        createdAt: '',
        updatedAt: '',
        ingredients: ['', '']
      }
    ];

    mockStatePending = {
      ...initialState,
      loadingData: true
    };

    mockStateFulfilled = {
      ...initialState,
      user: mockUserData,
      isAuthChecked: true
    };

    mockStateOrdersFulfilled = {
      ...initialState,
      userOrderList: mock,
      loadingData: false
    };

    mockStateRejected = {
      ...initialState,
      error: 'Ошибка'
    };
  });

  const createAction = (type: string, payload?: any, error?: any) => ({
    type,
    payload,
    ...(error ? { error } : {})
  });

  const testPendingState = (actionType: string) => {
    const action = createAction(actionType);
    const newState = authenticationSlice.reducer(initialState, action);
    expect(newState).toEqual(mockStatePending);
  };

  const testFulfilledState = (
    actionType: string,
    payload: any,
    expectedState: UserState
  ) => {
    const action = createAction(actionType, payload);
    const newState = authenticationSlice.reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  };

  const testRejectedState = (actionType: string) => {
    const action = createAction(actionType, undefined, { message: 'Ошибка' });
    const newState = authenticationSlice.reducer(initialState, action);
    expect(newState).toEqual(mockStateRejected);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    test('должен установить состояние "loadingData" при действии loginUser.pending', () => {
      testPendingState(loginUser.pending.type);
    });

    test('должен обновить пользователя при действии loginUser.fulfilled', () => {
      testFulfilledState(loginUser.fulfilled.type, mockUserData, {
        ...mockStateFulfilled,
        user: mockUserData,
        loadingData: false
      });
    });

    test('должен установить ошибку при действии loginUser.rejected', () => {
      testRejectedState(loginUser.rejected.type);
    });
  });

  describe('logoutUsers', () => {
    test('должен очистить пользователя при действии logoutUsers.fulfilled', () => {
      const action = createAction(logoutUsers.fulfilled.type);
      const newState = authenticationSlice.reducer(mockStateFulfilled, action);
      expect(newState).toEqual({
        ...mockStateFulfilled,
        user: null,
        isAuthChecked: false,
        loadingData: false
      });
    });
  });

  describe('registerUser', () => {
    test('должен установить состояние "loadingData" при действии registerUser.pending', () => {
      testPendingState(registerUser.pending.type);
    });

    test('должен обновить пользователя при действии registerUser.fulfilled', () => {
      testFulfilledState(registerUser.fulfilled.type, mockUserData, {
        ...mockStateFulfilled,
        user: mockUserData,
        loadingData: false
      });
    });

    test('должен установить ошибку при действии registerUser.rejected', () => {
      testRejectedState(registerUser.rejected.type);
    });
  });

  describe('updateUser', () => {
    test('должен установить состояние "loadingData" при действии updateUser.pending', () => {
      testPendingState(updateUser.pending.type);
    });

    test('должен обновить пользователя при действии updateUser.fulfilled', () => {
      testFulfilledState(updateUser.fulfilled.type, mockUserData, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: false,
        loadingData: false
      });
    });

    test('должен установить ошибку при действии updateUser.rejected', () => {
      testRejectedState(updateUser.rejected.type);
    });
  });

  describe('fetchUserOrders', () => {
    test('должен установить состояние "loadingData" при действии fetchUserOrders.pending', () => {
      testPendingState(fetchUserOrders.pending.type);
    });

    test('должен обновить список заказов при действии fetchUserOrders.fulfilled', () => {
      testFulfilledState(
        fetchUserOrders.fulfilled.type,
        mock,
        mockStateOrdersFulfilled
      );
    });

    test('должен установить ошибку при действии fetchUserOrders.rejected', () => {
      testRejectedState(fetchUserOrders.rejected.type);
    });
  });
});
