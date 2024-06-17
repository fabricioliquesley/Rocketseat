import "styled-components";
import { defaultTheme } from "../styles/theme/default";

type ThemType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemType {}
}
