import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { ReactNode } from 'react';
import {
  selectIsAuthChecked,
  selectLoadingData,
  selectUser
} from '../../services/authentication/selectorAuthentication';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

const ProtectedRoute = ({ onlyUnAuth, children }: TProtectedProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loadingData = useSelector(selectLoadingData);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked && loadingData) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.backgroundLocation || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation,
            state: null
          }
        }}
      />
    );
  }

  return children;
};

export const OnlyAuthRoute = ProtectedRoute;
export const OnlyUnAuthRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute onlyUnAuth>{children}</ProtectedRoute>
);
