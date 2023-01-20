import React, { ReactNode, FC, HTMLAttributes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';

interface IProtectedRoute extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const cookie = getCookie('accessToken');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookie ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
