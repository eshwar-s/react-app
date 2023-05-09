import {
  teal,
  green,
  red,
  purple,
  blue,
  grey,
  indigo,
  blueGrey,
} from "@mui/material/colors";
import { ROUTE } from "./routes";
import { ThemeMode } from "./theme";

export const ThemeColor = {
  INDIGO: "indigo",
  BLUE: "blue",
  PURPLE: "purple",
  RED: "red",
  GREEN: "green",
  TEAL: "teal",
  BLUE_GREY: "blueGrey",
};

export function getPrimaryColor(color) {
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

    case ThemeColor.BLUE_GREY:
      return {
        light: blueGrey[200],
        main: blueGrey[400],
        dark: blueGrey[500],
        contrastText: "#fff",
      };

    case ThemeColor.INDIGO:
    default:
      return {
        light: indigo[200],
        main: indigo[400],
        dark: indigo[500],
        contrastText: "#fff",
      };
  }
}

export function getSecondaryColor(isDarkMode) {
  return { main: isDarkMode ? grey[900] : grey[300] };
}

export function GetThemeColor(route, settings) {
  switch (route) {
    case ROUTE.SEARCH:
      return ThemeColor.BLUE_GREY;

    case ROUTE.PLANNED:
      return ThemeColor.TEAL;

    case ROUTE.IMPORTANT:
    case ROUTE.FLAGGED:
      return ThemeColor.RED;

    case ROUTE.MY_DAY:
    case ROUTE.TASKS:
      return ThemeColor.INDIGO;

    default:
      return settings.theme;
  }
}

export function getTextColor(theme) {
  return theme.palette.mode === ThemeMode.LIGHT
    ? theme.palette.primary.contrastText
    : theme.palette.primary.main;
}

export function getBackgroundColor(theme) {
  return theme.palette.mode === ThemeMode.LIGHT
    ? theme.palette.primary.main
    : theme.palette.background.default;
}
