import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';

import theme from './styles/theme'

// import { Details } from './pages/Details';
// import { Home } from './pages/Home';
// import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Signup />
    </ThemeProvider>
  </React.StrictMode>,
)
