import { ThemeProvider } from "styled-components";

const fontSizes: any = [14, 20, 96];
fontSizes.body = fontSizes[0];
fontSizes.bodyExtraLarge = fontSizes[1];
fontSizes.displayExtraLarge = fontSizes[2];

const primary = "#2567B4";
const secondary = "#F9B531";

const theme = {
  fontSizes,
  colors: {
    primary,
    secondary,
  },
};

type ThemeProps = {
  children: React.ReactNode;
};

export const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
