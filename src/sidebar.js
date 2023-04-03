import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ACTION_TYPES } from "./actions";
import { AppContext } from "./context";
import TodoLists from "./todo-lists";

function Sidebar() {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();

  const handleListAdd = () => {
    dispatch({ type: ACTION_TYPES.ADD_LIST });
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Box sx={{ flexGrow: "1" }}>
        <TodoLists></TodoLists>
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

export default Sidebar;
