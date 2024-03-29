import React, { useEffect, FC } from 'react';
import AppHeader from '../app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import HomePage from '../../pages/home-page/home-page';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import Profile from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrdersPage from '../../pages/orders-page/orders-page';
import { checkAuth } from '../../services/actions/user-authentication';
import Loader from '../loader/loader';
import Feed from '../../pages/feed/feed';
import OrderInfo from '../order-info/order-info';
import { getIngredientsDetailedInfo } from '../../utils/selectors';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { useOwnDispatch as useDispatch, useOwnSelector as useSelector } from '../../services/types';
import { TUseLocation } from '../../services/types/pages';

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TUseLocation>();

  const { ingredients } = useSelector(getIngredientsDetailedInfo);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  const background = location.state?.background;

  const closeIngredientModal = () => {
    history.goBack();
  };

  return (
    <div className='App'>
      <AppHeader />
      {ingredients.length === 0 ? (
        <Loader />
      ) : (
        <Switch location={background || location}>
          <Route
            path={'/'}
            exact
          >
            <HomePage />
          </Route>
          <ProtectedRoute
            path={'/login'}
            exact
            onlyForAuth={false}
          >
            <Login />
          </ProtectedRoute>
          <ProtectedRoute
            path={'/register'}
            exact
            onlyForAuth={false}
          >
            <Register />
          </ProtectedRoute>
          <ProtectedRoute
            path={'/forgot-password'}
            exact
            onlyForAuth={false}
          >
            <ForgotPassword />
          </ProtectedRoute>
          <Route
            path={'/reset-password'}
            exact
          >
            <ResetPassword />
          </Route>
          <Route
            path={'/feed'}
            exact
          >
            <Feed />
          </Route>
          <Route
            path={'/feed/:id'}
            exact
          >
            <OrderInfo inModal={false} />
          </Route>
          <ProtectedRoute
            path={'/profile'}
            onlyForAuth
            exact
          >
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute
            path={'/profile/orders'}
            onlyForAuth
            exact
          >
            <OrdersPage />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            onlyForAuth
            path={'/profile/orders/:id'}
          >
            <OrderInfo inModal={false} />
          </ProtectedRoute>
          <Route
            path={'/ingredients/:id'}
            exact
          >
            <IngredientPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      )}

      {background && (
        <Switch>
          <Route path={'/ingredients/:id'}>
            <Modal
              closeAllModals={closeIngredientModal}
              onOverlayClick={closeIngredientModal}
            >
              <IngredientDetails />
            </Modal>
          </Route>
          <Route
            exact
            path={'/feed/:id'}
          >
            <Modal
              closeAllModals={closeIngredientModal}
              onOverlayClick={closeIngredientModal}
            >
              <OrderInfo inModal={true} />
            </Modal>
          </Route>
          <ProtectedRoute
            exact
            onlyForAuth
            path={'/profile/orders/:id'}
          >
            <Modal
              closeAllModals={closeIngredientModal}
              onOverlayClick={closeIngredientModal}
            >
              <OrderInfo inModal={true} />
            </Modal>
          </ProtectedRoute>
        </Switch>
      )}
    </div>
  );
};

export default App;
