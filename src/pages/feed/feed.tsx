import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../slices/feeds-slice';
import { getFeedOrders, getFeedLoading } from '../../utils/constants';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedOrders);
  const isLoading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchFeeds()).finally(() => setFirstLoad(false));
  }, [dispatch]);

  if (isLoading && firstLoad) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleRefresh} />;
};
