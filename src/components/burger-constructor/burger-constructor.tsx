import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearIngredients } from '../../services/burgerConstructor/constructorSlice';
import { placeBurgerOrder } from '../../services/orderManagement/orderActions';
import { clearOrderData } from '../../services/orderManagement/orderSlice';

import { useNavigate } from 'react-router-dom';
import {
  selectCurrentOrderData,
  selectOrderRequestStatus
} from '../../services/orderManagement/selectorOrder';
import { selectConstructorItems } from '../../services/burgerConstructor/selectorConstructor';
import { selectUser } from '../../services/authentication/selectorAuthentication';

export const BurgerConstructor: FC = () => {
  // Получаем данные из стора
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequestStatus);
  const orderModalData = useSelector(selectCurrentOrderData);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientIds = constructorItems.ingredients.map(
      (ing: TConstructorIngredient) => ing._id
    );

    const orderData = [
      constructorItems.bun._id,
      ...ingredientIds,
      constructorItems.bun._id
    ];

    dispatch(placeBurgerOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderData());
    dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
