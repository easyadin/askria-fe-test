import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from 'antd';
import { queryClient } from './lib/configs/appConfig.ts';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import AntThemeConfig from './lib/configs/styleConfig.ts';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={AntThemeConfig}>
            <App />
          </ConfigProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
}
