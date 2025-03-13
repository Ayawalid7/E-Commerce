import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
import "./index.css";
import App from './App.jsx';
import { HeroUIProvider } from '@heroui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const root = createRoot(document.getElementById('root')); 

root.render(
  <StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </StrictMode>
);

