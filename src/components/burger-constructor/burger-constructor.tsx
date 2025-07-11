import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor } from '../../slices/constructor-slice';
import { clearCurrentOrder, createOrder } from '../../slices/orders-slice';
import {
  getConstructorState,
  getAuthUser,
  getOrderPending,
  getOrderData
} from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const user = useSelector(getAuthUser);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients = [] } = useSelector(getConstructorState);

  const orderRequest = useSelector(getOrderPending);
  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    const isOrderBlocked = !bun || orderRequest;

    if (isOrderBlocked) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map(({ _id }) => _id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
