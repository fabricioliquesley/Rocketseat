import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/defaultTheme";
import { GlobalStyled } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { PostsProvider } from "./contexts/postsContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <PostsProvider>
          <Router />
        </PostsProvider>
      </BrowserRouter>
      <GlobalStyled />
    </ThemeProvider>
  );
}
