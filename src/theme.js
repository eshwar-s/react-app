import { createTheme } from "@mui/material";
import { grey, indigo, red } from "@mui/material/colors";

function getTheme(mode) {
  return createTheme({
    palette: {
      primary: {
        main: indigo[400],
      },
      secondary: {
        main: grey[300],
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
