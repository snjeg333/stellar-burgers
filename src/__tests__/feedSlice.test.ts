import {
  FeedState,
  fetchFeed,
  fetchOrderByNumber,
  initialState,
  orderFeedSlice
} from 'src/services/orderFeed';

describe('слайс состояния заказов', () => {
  const mock = [
    {
      _id: '1',
      status: 'done',
      name: 'bun',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['']
    },
    {
      _id: '2',
      status: 'done',
      name: 'main',
      createdAt: '',
      updatedAt: '',
      number: 2,
      ingredients: ['']
    },
    {
      _id: '3',
      status: 'done',
      name: 'sauce',
      createdAt: '',
      updatedAt: '',
      number: 3,
      ingredients: ['']
    }
  ];

  const mockLoadingState: FeedState = {
    ...initialState,
    loadingData: true
  };

  const mockDataLoadedState: FeedState = {
    ...initialState,
    orders: mock,
    total: 3,
    totalToday: 2
  };

  const mockErrorState: FeedState = {
    ...initialState,
    loadingData: false
  };

  const testPendingState = (actionType: string) => {
    test(`должен изменить статус при "${actionType}"`, () => {
      const action = { type: actionType };
      const newState = orderFeedSlice.reducer(initialState, action);
      expect(newState).toEqual(mockLoadingState);
    });
  };

  const testFulfilledState = (
    actionType: string,
    payload: any,
    expectedState: FeedState
  ) => {
    test(`должен изменить статус при "${actionType}"`, () => {
      const action = {
        type: actionType,
        payload
      };
      const newState = orderFeedSlice.reducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  };

  const testRejectedState = (actionType: string) => {
    test(`должен изменить статус при "${actionType}" с ошибкой`, () => {
      const action = { type: actionType, error: { message: 'Ошибка' } };
      const newState = orderFeedSlice.reducer(initialState, action);
      expect(newState).toEqual(mockErrorState);
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  testPendingState(fetchFeed.pending.type);
  testFulfilledState(
    fetchFeed.fulfilled.type,
    { orders: mock, total: 3, totalToday: 2 },
    mockDataLoadedState
  );
  testRejectedState(fetchFeed.rejected.type);

  testPendingState(fetchOrderByNumber.pending.type);
  testFulfilledState(fetchOrderByNumber.fulfilled.type, mock[0], {
    ...initialState,
    previewOrder: mock[0],
    orders: [],
    total: 0,
    totalToday: 0
  });
  testRejectedState(fetchOrderByNumber.rejected.type);

  test('должен правильно обрабатывать редьюсер setFeedData', () => {
    const action = {
      type: orderFeedSlice.actions.setFeedData.type,
      payload: { orders: mock, total: 3, totalToday: 2 }
    };
    const newState = orderFeedSlice.reducer(initialState, action);
    expect(newState).toEqual(mockDataLoadedState);
  });

  test('должен правильно обрабатывать редьюсер setLoadingData', () => {
    const action = {
      type: orderFeedSlice.actions.setLoadingData.type,
      payload: true
    };
    const newState = orderFeedSlice.reducer(initialState, action);
    expect(newState).toEqual(mockLoadingState);
  });

  test('должен правильно обрабатывать редьюсер setPreviewOrder', () => {
    const action = {
      type: orderFeedSlice.actions.setPreviewOrder.type,
      payload: mock[0]
    };
    const newState = orderFeedSlice.reducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      previewOrder: mock[0]
    });
  });
});
