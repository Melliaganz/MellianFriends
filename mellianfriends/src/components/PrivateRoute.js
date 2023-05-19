import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

// Composant PrivateRoute pour protéger les routes
const PrivateRoute = ({ element: Element, isLoggedIn, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? (
          <Element />
        ) : (
          navigate("/login")
        )
      }
    />
  );
};

export default PrivateRoute;