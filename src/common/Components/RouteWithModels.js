import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import savedSamples from 'savedSamples';

const RouteWithModels = ({ component: Component, ...props }) => {
  function render(routeProps) {
    const sample = savedSamples.find(
      ({ cid }) => cid === routeProps.match.params.smpId
    );

    return <Component sample={sample} {...routeProps} />;
  }

  return <Route render={render} {...props} />;
};
RouteWithModels.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export function getRoutesWithModels(routes) {
  const getRouteWithModels = ([path, component, skipModels]) => {
    if (skipModels) {
      return <Route key={path} path={path} component={component} exact />;
    }

    return (
      <RouteWithModels key={path} path={path} component={component} exact />
    );
  };

  return routes.map(getRouteWithModels);
}

export default RouteWithModels;
