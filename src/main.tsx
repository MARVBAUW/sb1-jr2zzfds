import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prefetch critical assets
const prefetchLinks = [
  { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
  { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap', as: 'style' },
];

// Add prefetch links to head
prefetchLinks.forEach(({ rel, href, crossorigin }) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (crossorigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Create root with error boundary
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find root element');

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);