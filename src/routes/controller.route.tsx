import { Route, Routes } from 'react-router-dom';
import { withErrorBoundary } from '../lib/HOCs/withErrorBoundary';
import { withSuspense } from '../lib/HOCs/withSuspense';
import RouteList from './route';
import { Drawer, Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const RouteController = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Drawer
        size='large'
        placement='left'
        open={drawerState}
        onClose={() => setDrawerState(!drawerState)}
      >
        <Sidebar
          isCollapsedInitialState={false}
          showTrigger={false}
          onCollapsed={() => {}}
        />
      </Drawer>

      <Sidebar
        className='desktop-app-nav-sider'
        isCollapsedInitialState={true}
        showTrigger={true}
        onCollapsed={(isCollapsed) => {
          setCollapsed(isCollapsed);
        }}
      />

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }} id='app-base-route-layout'>
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
