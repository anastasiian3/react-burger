import React, { ReactNode, FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { TUseLocation } from '../../services/types/pages';
import { getCookie } from '../../utils/cookies';

type IProtectedRoute = RouteProps & {
  onlyForAuth: boolean;
  path: string;
  children?: ReactNode;
  exact?: boolean;
};

const ProtectedRoute: FC<IProtectedRoute> = ({ onlyForAuth, children, ...rest }) => {
  const isAuthorized = getCookie('accessToken');
  const location = useLocation<TUseLocation>();

  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: '/' } };
    return (
      <Route {...rest}>
        <Redirect to={from!} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
