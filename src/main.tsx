import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from 'antd';
import colors from './constants/colors.ts';
import { queryClient } from './lib/appConfig.ts';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ token: { colorPrimary: colors.primary } }}>
            <App />
          </ConfigProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
}
