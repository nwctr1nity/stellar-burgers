import { useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import {
  AppHeader,
  ProtectedRoute,
  Modal,
  OrderInfo,
  IngredientDetails
} from '@components';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { fetchUser } from '../../slices/auth-slice';
import { loadIngredientData } from '../../slices/details-slice';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(loadIngredientData());
  }, [dispatch]);

  const modalRoutes = [
    {
      path: '/feed/:number',
      element: <OrderInfo />,
      title: 'Детали заказа'
    },
    {
      path: '/ingredients/:id',
      element: <IngredientDetails />,
      title: 'Детали ингредиента'
    },
    {
      path: '/profile/orders/:number',
      element: <OrderInfo />,
      title: 'Детали заказа'
    }
  ];

  const protectedRoutes = [
    { path: '/register', element: <Register />, authProtected: false },
    { path: '/login', element: <Login />, authProtected: false },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
      authProtected: false
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
      authProtected: false
    },
    { path: '/profile', element: <Profile />, authProtected: true },
    { path: '/profile/orders', element: <ProfileOrders />, authProtected: true }
  ];

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        {protectedRoutes.map(({ path, element, authProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute authProtected={authProtected}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}

        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          {modalRoutes.map(({ path, element, title }) => (
            <Route
              key={path}
              path={path}
              element={
                <Modal title={title} onClose={() => navigate(-1)}>
                  {element}
                </Modal>
              }
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
