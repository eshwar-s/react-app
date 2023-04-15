import {
  CheckCircleOutline,
  DeleteOutline,
  FlipOutlined,
  MoreHoriz,
  PaletteOutlined,
  PrintOutlined,
  SortOutlined,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTextColor } from "./list-view";
import DeleteList from "./delete-list";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";

function ListMenu({ list }) {
  const [state, dispatch] = useContext(AppContext);
  const [anchorElement, setAnchorElement] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const toggleShowCompletedTasks = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SHOW_COMPLETED_TASKS,
      payload: null,
    });
  };

  return (
    <>
      <Button
        id="list-menu-button"
        sx={{ color: getTextColor(theme) }}
        disableElevation
        size="small"
        aria-haspopup="true"
        onClick={(event) => setAnchorElement(event.currentTarget)}
      >
        <MoreHoriz />
      </Button>
      <Menu
        id="list-menu"
        MenuListProps={{
          "aria-labelledby": "list-menu-button",
        }}
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
        elevation={0}
      >
        <MenuItem dense onClick={() => setAnchorElement(null)}>
          <ListItemIcon>
            <FlipOutlined />
          </ListItemIcon>
          <ListItemText>{t("renameList")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorElement(null)}>
          <ListItemIcon>
            <SortOutlined />
          </ListItemIcon>
          <ListItemText>{t("sortList")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorElement(null)}>
          <ListItemIcon>
            <PaletteOutlined />
          </ListItemIcon>
          <ListItemText>{t("changeTheme")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorElement(null)}>
          <ListItemIcon>
            <PrintOutlined />
          </ListItemIcon>
          <ListItemText>{t("printList")}</ListItemText>
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            toggleShowCompletedTasks();
            setAnchorElement(null);
          }}
        >
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>
          <ListItemText>
            {state.settings.showCompleted
              ? t("hideCompletedTasks")
              : t("showCompletedTasks")}
          </ListItemText>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          dense
          onClick={() => {
            setIsDeleting(true);
            setAnchorElement(null);
          }}
        >
          <ListItemIcon>
            <DeleteOutline />
          </ListItemIcon>
          <ListItemText>{t("deleteList")}</ListItemText>
        </MenuItem>
      </Menu>
      <DeleteList
        list={list}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
    </>
  );
}

export default ListMenu;
