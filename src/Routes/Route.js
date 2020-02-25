import React from 'react';

import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '~/components/Header';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  path,
  ...rest
}) {
  const signed = useSelector(state => state.auth.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />;
  }
  if (path !== '/') {
    return (
      <Route
        {...rest}
        render={props => (
          <>
            <Header />
            <Component {...props} />
          </>
        )}
      />
    );
  }

  return <Route {...rest} path component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
