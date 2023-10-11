import FallbackSkeleton from './components/FallbackSkeleton';
import { withErrorBoundary } from './lib/HOCs/withErrorBoundary';
import { withSuspense } from './lib/HOCs/withSuspense';
import RouteController from './routes/controller.route';
import { Suspense } from 'react';

const App = () => {
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
