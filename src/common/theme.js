import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

function getTheme(mode) {
  return createTheme({
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
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              border: `2px solid ${indigo[500]}`,
            },
          },
        },
      },
    },
  });
}

export default getTheme;
