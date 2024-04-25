import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostProvider } from './context/postContext';
import { AuthProvider } from './context/userContext';
import { NavigationProvider } from './context/navigationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>  
      </PostProvider>
    </AuthProvider>

  </React.StrictMode>
);
