import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Location
} from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/authentication/authActions';
import { OnlyAuthRoute, OnlyUnAuthRoute } from '../hoc/protected-route';

import { getIngredients } from '../../services/burgerIngredients/ingredientsActions';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();
  const backgroundLocation = (location.state as { background?: Location })
    ?.background;

  const modalClose = useCallback((): void => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes location={backgroundLocation || location} />
      {backgroundLocation && <ModalRoutes modalClose={modalClose} />}
    </div>
  );
};

type AppRoutesProps = {
  location: Location;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ location }) => (
  <Routes location={location}>
    <Route path='/' element={<ConstructorPage />} />
    <Route path='/feed' element={<Feed />} />
    <Route
      path='/login'
      element={
        <OnlyUnAuthRoute>
          <Login />
        </OnlyUnAuthRoute>
      }
    />
    <Route
      path='/register'
      element={
        <OnlyUnAuthRoute>
          <Register />
        </OnlyUnAuthRoute>
      }
    />
    <Route
      path='/profile'
      element={
        <OnlyAuthRoute>
          <Profile />
        </OnlyAuthRoute>
      }
    />
    <Route
      path='/profile/orders'
      element={
        <OnlyAuthRoute>
          <ProfileOrders />
        </OnlyAuthRoute>
      }
    />
    <Route
      path='/forgot-password'
      element={
        <OnlyUnAuthRoute>
          <ForgotPassword />
        </OnlyUnAuthRoute>
      }
    />
    <Route
      path='/reset-password'
      element={
        <OnlyUnAuthRoute>
          <ResetPassword />
        </OnlyUnAuthRoute>
      }
    />
    <Route path='/ingredients/:id' element={<IngredientDetails />} />
    <Route path='/feed/:number' element={<OrderInfo />} />
    <Route
      path='/profile/orders/:number'
      element={
        <OnlyAuthRoute>
          <OrderInfo />
        </OnlyAuthRoute>
      }
    />
    <Route path='*' element={<NotFound404 />} />
  </Routes>
);

type ModalRoutesProps = {
  modalClose: () => void;
};

const ModalRoutes: React.FC<ModalRoutesProps> = ({ modalClose }) => (
  <Routes>
    <Route
      path='/ingredients/:id'
      element={
        <Modal title='Детали ингредиента' onClose={modalClose}>
          <IngredientDetails />
        </Modal>
      }
    />
    <Route
      path='/feed/:number'
      element={
        <Modal title='Описание заказа' onClose={modalClose}>
          <OrderInfo />
        </Modal>
      }
    />
    <Route
      path='/profile/orders/:number'
      element={
        <Modal title='Описание заказу' onClose={modalClose}>
          <OnlyAuthRoute>
            <OrderInfo />
          </OnlyAuthRoute>
        </Modal>
      }
    />
  </Routes>
);

export default App;
