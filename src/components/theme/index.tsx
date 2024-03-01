import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./Theme";
import { GlobalCss } from "./defaultCss";

const ThemeProviderContainer: React.FC = (props) => {
  return (
    <>
      <GlobalCss />
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </>
  );
};

export default ThemeProviderContainer;
