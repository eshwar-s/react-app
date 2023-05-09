import { useTranslation } from "react-i18next";
import { Box, useTheme } from "@mui/material";
import { Heading } from "./heading";
import { getBackgroundColor } from "../common/colors";

function MyDayView() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box role="main" sx={getStyle(theme)}>
      <Box sx={{ overflowY: "scroll" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading text={t("myDay")} />
        </Box>
      </Box>
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

export default MyDayView;
