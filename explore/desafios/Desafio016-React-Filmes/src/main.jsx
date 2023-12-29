import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "styled-components";
import theme from './style/theme.js';

import { App } from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
