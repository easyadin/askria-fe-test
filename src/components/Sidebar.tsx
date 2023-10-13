import React, { useMemo, useState } from 'react';
import {
  HomeOutlined,
  ShareAltOutlined,
  UserSwitchOutlined,
  LineChartOutlined,
  RightOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { MenuProps, SiderProps } from 'antd';
import { Button, Flex, Image, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ROUTES } from '../constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number] & { route: string };

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const topNavigationMenus: MenuItem[] = [
  getItem('Home', 'LANDING', <HomeOutlined />),
  getItem('Templates', 'TEMPLATES', <EditOutlined />),
  getItem('Candidates', 'CANDIDATES', <UserSwitchOutlined />),
  getItem('Reports', 'REPORTS', <LineChartOutlined />),
  getItem('Shared Profiles', 'SHARED_PROFILES', <ShareAltOutlined />),
];

type Props = Partial<SiderProps> & {
  isCollapsedInitialState: boolean;
  showTrigger: boolean;
  onCollapsed: (isCollapsed: boolean) => void;
};

const Sidebar = ({
  isCollapsedInitialState,
  showTrigger,
  onCollapsed,
  ...rest
}: Props) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isCollapsedInitialState);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    onCollapsed(!collapsed);
  };

  const onClickMenu = (key: keyof typeof ROUTES) => {
    navigate(ROUTES[key]);
  };

  const findSelectedKey = () => {
    const routeKey = Object.keys(ROUTES).find(
      (key) => ROUTES[key as keyof typeof ROUTES] === location.pathname
    );
    return routeKey || 'TEMPLATES';
  };

  const selectedKey = useMemo(() => {
    return findSelectedKey();
  }, [location.pathname]);

  return (
    <Sider
      trigger={
        showTrigger ? (
          <Button
            style={{
              outline: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={toggleCollapsed}
          >
            <RightOutlined
              rotate={collapsed ? 360 : 180}
              style={{
                fontSize: collapsed ? 16 : 24,
              }}
            />
          </Button>
        ) : null
      }
      collapsible
      collapsed={collapsed}
      theme='light'
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      {...rest}
    >
      <Flex justify='center'>
        <Image
          style={{ maxHeight: 64 }}
          src='https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/mzwk7rkhgxoavrouests'
          preview={false}
          onClick={() => onClickMenu('TEMPLATES')}
        />
      </Flex>

      <Menu
        selectedKeys={[selectedKey]}
        mode='inline'
        items={topNavigationMenus}
        style={{ border: 'none', padding: 10, marginTop: 10 }}
        onClick={(menu: any) => onClickMenu(menu.key)}
      />
    </Sider>
  );
};

export default Sidebar;
