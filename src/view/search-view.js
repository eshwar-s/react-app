import { getBackgroundColor } from "../common/colors";
import { Box, useTheme } from "@mui/material";

function SearchView() {
  const theme = useTheme();

  return (
    <Box role="main" sx={getStyle(theme)}>
      <Box sx={{ overflowY: "scroll" }}></Box>
    </Box>
  );
}

function getStyle(theme) {
  return {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    overflow: "hidden",
    justifyContent: "space-between",
    bgcolor: getBackgroundColor(theme),
    height: "100%",
    padding: "12px",
  };
}

export default SearchView;
