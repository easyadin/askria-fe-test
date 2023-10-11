import { lazy } from 'react';
import IRoute from './route.interface';
import { ROUTES } from '../constants/routes';

const Landing = lazy(
  () => import('../pages/Landing' /* webpackChunkName:"Landing" */)
);

const Applications = lazy(
  () => import('../pages/Applications' /* webpackChunkName:"Applications" */)
);

const Reports = lazy(
  () => import('../pages/Reports' /* webpackChunkName:"Reports" */)
);

const SharedProfiles = lazy(
  () =>
    import('../pages/SharedProfiles' /* webpackChunkName:"SharedProfiles" */)
);

const RouteList = (): IRoute[] => {
  return [
    {
      element: Landing,
      path: ROUTES.LANDING,
    },
    {
      element: Applications,
      path: ROUTES.APPLICATIONS,
    },
    {
      element: Reports,
      path: ROUTES.REPORTS,
    },
    {
      element: SharedProfiles,
      path: ROUTES.SHARED_PROFILES,
    },
  ];
};

export default RouteList;
