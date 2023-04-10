import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

function getTheme(mode) {
  let theme = createTheme({
    palette: {
      primary: {
        light: indigo[100],
        main: indigo[400],
        dark: indigo[500],
      },
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
