import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from '../lib/HOCs/withErrorBoundary';
import { withSuspense } from '../lib/HOCs/withSuspense';
import RouteList from './route';
import { Layout } from 'antd';

const RouteController = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Routes>
          {RouteList().map(({ element: Element, path }, i) => {
            const LazyRoute = withErrorBoundary(
              withSuspense(Element, {
                fallBackComponent: <div />,
              })
            );

            return <Route key={path + i} element={<LazyRoute />} path={path} />;
          })}
        </Routes>
      </Layout>
    </Layout>
  );
};

export default RouteController;
