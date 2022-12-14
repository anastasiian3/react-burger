import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';

const ProtectedRoute = ({ children, ...rest }) => {
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
