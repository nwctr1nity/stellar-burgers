import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { TIngredient } from '../../utils/types';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrderData,
  getDetailsList,
  getOrderPending
} from '../../utils/constants';
import {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../../slices/orders-slice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const orderIngredients: TIngredient[] = useSelector(getDetailsList);
  const isLoading = useSelector(getOrderPending);

  const { number } = useParams<{ number: string }>();
  const orderData = useSelector(getOrderData);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(parseInt(number)));
    }
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !orderIngredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = orderIngredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, orderIngredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
