import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/default";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyled } from "./styles/global";
import { Router } from "./Router";
import { CartContextProvider } from "./context/CartContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CartContextProvider>
          <Router />
        </CartContextProvider>
      </BrowserRouter>
      <GlobalStyled />
    </ThemeProvider>
  );
}

export default App;
