import { Typography, useTheme } from "@mui/material";
import { getTextColor } from "../common/colors";

export function Heading({ text }) {
  const theme = useTheme();

  return (
    <Typography
      id="heading"
      variant="h5"
      gutterBottom
      noWrap
      sx={{
        fontWeight: "bold",
        color: getTextColor(theme),
        outline: "0px solid transparent",
        userSelect: "none",
      }}
    >
      {text}
    </Typography>
  );
}
