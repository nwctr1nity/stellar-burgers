import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { getAuthUser, getAuthLoading } from '../../utils/constants';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  authProtected?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  authProtected = false,
  children
}) => {
  const user = useSelector(getAuthUser);
  const loading = useSelector(getAuthLoading);
  const location = useLocation();

  if (loading) {
    return <Preloader />;
  }

  if (authProtected && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!authProtected && user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
