import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from './app/providers/queryClient';
import { GlobalProgress } from "./shared/ui/GlobalProgress";
import App from './app/App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalProgress />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
