import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { getPrimaryColor, getSecondaryColor } from "./colors";

export const ThemeMode = {
  DARK: "dark",
  LIGHT: "light",
};

function useTheme(isDarkMode, themeColor) {
  return useMemo(() => {
    let theme = createTheme({
      palette: {
        mode: isDarkMode ? ThemeMode.DARK : ThemeMode.LIGHT,
        primary: getPrimaryColor(themeColor),
        secondary: getSecondaryColor(isDarkMode),
      },
      typography: {
        button: {
          textTransform: "none",
        },
      },
    });

    return createTheme(theme, {
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
          },
          styleOverrides: {
            root: {
              "&.Mui-focusVisible": {
                border: `2px solid ${theme.palette.primary.dark}`,
              },
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: { borderRadius: "8px" },
          },
        },
      },
    });
  }, [isDarkMode, themeColor]);
}

export default useTheme;
