import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import NavigationPane from "./navigation-pane";

function Sidebar() {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();

  const handleListAdd = () => {
    dispatch({ type: ACTION_TYPES.ADD_LIST });
  };

  return (
    <Box sx={getStyle(theme)}>
      <Box sx={{ flex: "1 1 auto", overflowY: "scroll" }}>
        <NavigationPane></NavigationPane>
      </Box>
      <Button
        sx={{
          color: theme.palette.text.primary,
          fontWeight: "normal",
          justifyContent: "flex-start",
        }}
        size="large"
        startIcon={<AddIcon></AddIcon>}
        onClick={handleListAdd}
      >
        New List
      </Button>
    </Box>
  );
}

function getStyle(theme) {
  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    backgroundColor: theme.palette.secondary.main,
  };
}

export default Sidebar;