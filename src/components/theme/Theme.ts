import { color } from "./Color";
import { createTheme } from '@material-ui/core/styles';


export const theme = createTheme({
  palette: {
    common: {
      black: color.black,
    },
    // text: {
    //   primary: color.primary
    // },
    primary: {
      main: color.primary,
    },
    secondary: {
      main: color.secondary,
    },
    grey: {
      300: color.gray,
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "36px",
      fontWeight: 500,
    },
    h2: {
      fontSize: "30px",
      marginBottom: "20px",
    },
    h3: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    h4: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    h5: {
      fontSize: "14px",
      marginBottom: "20px",
    },
    h6: {
      fontSize: "12px",
      marginBottom: "20px",
    },
    button: {
      fontWeight: 400,
      fontSize: "inherit",
      textTransform: "inherit",
      boxShadow: "none",
      minWidth: "150px",
    },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        "& h2": {
          fontSize: "18px",
        },
      },
    },
  },
});
