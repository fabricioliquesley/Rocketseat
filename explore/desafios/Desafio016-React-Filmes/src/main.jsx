import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "styled-components";
import theme from './style/theme.js';
import { GlobalStyle } from './style/globals.js';

import { AuthProvider } from './hook/auth';
import { Routes } from './Routes/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
