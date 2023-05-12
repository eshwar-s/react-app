import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import NavigationMenu from "./navigation-menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SearchBox from "./search-box";
import { useTodoLists } from "../common/hooks";
import { ROUTE } from "../common/routes";

function Sidebar() {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lists = useTodoLists(state.lists);

  const handleListAdd = () => {
    dispatch({ type: ACTION_TYPES.ADD_LIST });
    navigate(`${ROUTE.LISTS}/${lists.length}`);
  };

  return (
    <Box sx={getStyle(theme)}>
      <Box sx={{ overflowY: "scroll" }}>
        <SearchBox />
        <NavigationMenu />
      </Box>
      <Button
        sx={{
          color: theme.palette.text.primary,
          fontWeight: "normal",
          justifyContent: "flex-start",
        }}
        size="large"
        startIcon={<AddIcon />}
        onClick={handleListAdd}
      >
        {t("newList")}
      </Button>
    </Box>
  );
}

function getStyle(theme) {
  return {
    width: "250px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px",
    backgroundColor: theme.palette.secondary.main,
  };
}

export default Sidebar;
