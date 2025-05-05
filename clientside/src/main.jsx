import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ShopProvider } from './context/ShopProvider';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>
);