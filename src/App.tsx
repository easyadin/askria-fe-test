import FallbackSkeleton from './components/FallbackSkeleton';
import { withErrorBoundary } from './lib/HOCs/withErrorBoundary';
import { withSuspense } from './lib/HOCs/withSuspense';
import RouteController from './routes/controller.route';
import { Suspense } from 'react';
import './App.css';
import useAxiosConfig from './lib/hooks/useAxiosConfig';

const App = () => {
  useAxiosConfig();

  return (
    <Suspense fallback={<FallbackSkeleton />}>
      <RouteController />
    </Suspense>
  );
};

export default withErrorBoundary(
  withSuspense(App, {
    fallBackComponent: <FallbackSkeleton />,
  }),
  { errorComponentProps: { className: 'h-screen' } }
);
