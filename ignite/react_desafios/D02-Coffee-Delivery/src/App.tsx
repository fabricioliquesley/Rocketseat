import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/default";
import { Title } from "./App";
import { GlobalStyled } from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Title>Hello, World</Title>
      <GlobalStyled />
    </ThemeProvider>
  );
}

export default App;
