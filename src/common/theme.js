import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { getErrorColor, getPrimaryColor, getSecondaryColor } from "./colors";

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
        error: getErrorColor(),
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
        },
        MuiDialog: {
          defaultProps: {
            TransitionProps: {
              mountOnEnter: true,
              unmountOnExit: true,
            },
          },
          styleOverrides: {
            paper: {
              borderRadius: "8px",
              padding: "16px",
              minWidth: "300px",
              maxWidth: "500px",
            },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              cursor: "default",
            },
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              minWidth: "40px",
            },
          },
        },
      },
    });
  }, [isDarkMode, themeColor]);
}

export default useTheme;
