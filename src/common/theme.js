import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

function getTheme(mode) {
  return createTheme({
    palette: {
      primary: {
        light: indigo[100],
        main: indigo[400],
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
      },
    },
  });
}

export default getTheme;
