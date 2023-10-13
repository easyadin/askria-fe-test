import { lazy } from 'react';
import IRoute from './route.interface';
import { ROUTES } from '../constants/routes';

const Landing = lazy(
  () => import('../pages/Landing' /* webpackChunkName:"Landing" */)
);

const Template = lazy(
  () => import('../pages/Template' /* webpackChunkName:"Template" */)
);

const Candidates = lazy(
  () => import('../pages/Candidates' /* webpackChunkName:"Candidates" */)
);

const Reports = lazy(
  () => import('../pages/Reports' /* webpackChunkName:"Reports" */)
);

const SharedProfiles = lazy(
  () =>
    import('../pages/SharedProfiles' /* webpackChunkName:"SharedProfiles" */)
);

const Templates = lazy(
  () => import('../pages/Templates' /* webpackChunkName:"Templates" */)
);

const RouteList = (): IRoute[] => {
  return [
    {
      element: Landing,
      path: ROUTES.LANDING,
    },
    {
      element: Templates,
      path: ROUTES.TEMPLATES,
    },
    {
      element: Template,
      path: ROUTES.TEMPLATES + '/:id',
    },
    {
      element: Candidates,
      path: ROUTES.CANDIDATES,
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
