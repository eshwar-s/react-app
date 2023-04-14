import { createTheme } from "@mui/material";
import {
  teal,
  green,
  red,
  purple,
  blue,
  grey,
  indigo,
} from "@mui/material/colors";

export const ThemeColor = {
  BLUE: "blue",
  PURPLE: "purple",
  RED: "red",
  GREEN: "green",
  TEAL: "teal",
  INDIGO: "indigo",
};

export const ThemeMode = {
  DARK: "dark",
  LIGHT: "light",
};

function getPrimaryColor(color) {
  switch (color) {
    case ThemeColor.BLUE:
      return {
        light: blue[200],
        main: blue[400],
        dark: blue[500],
        contrastText: "#fff",
      };

    case ThemeColor.PURPLE:
      return {
        light: purple[200],
        main: purple[400],
        dark: purple[500],
        contrastText: "#fff",
      };

    case ThemeColor.RED:
      return {
        light: red[200],
        main: red[400],
        dark: red[500],
        contrastText: "#fff",
      };

    case ThemeColor.GREEN:
      return {
        light: green[200],
        main: green[400],
        dark: green[500],
        contrastText: "#fff",
      };

    case ThemeColor.TEAL:
      return {
        light: teal[200],
        main: teal[400],
        dark: teal[500],
        contrastText: "#fff",
      };

    case ThemeColor.INDIGO:
      return {
        light: indigo[200],
        main: indigo[400],
        dark: indigo[500],
        contrastText: "#fff",
      };
  }
  console.error(`Invalid color provided ${color}`);
}

function getTheme(darkMode, themeColor = ThemeColor.INDIGO) {
  let theme = createTheme({
    palette: {
      mode: darkMode ? ThemeMode.DARK : ThemeMode.LIGHT,
      primary: getPrimaryColor(themeColor),
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
    sidebar: {
      background: darkMode ? grey[900] : grey[300],
    },
  });

  return createTheme(theme, {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              border: `2px solid ${theme.palette.primary.dark}`,
            },
          },
        },
      },
    },
  });
}

export default getTheme;
