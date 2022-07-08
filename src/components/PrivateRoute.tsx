import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import { RoutePaths } from '../utils/enum';


const PrivateRoute = ({ component: Component, path }: RouteProps) => {
  // const authContext = useAuthContext();
  // console.log(authContext)
  const authContext = JSON.parse(localStorage.getItem("user") || "{}");
  if (!authContext.id) {
    return <Redirect to={RoutePaths.Login} />;
  }

  return <Route exact component={Component} path={path} />;
};

export default PrivateRoute;