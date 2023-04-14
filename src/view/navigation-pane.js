import {
  DeleteOutlined,
  FlipOutlined,
  List as ListIcon,
  PrintOutlined,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import { Link } from "react-router-dom";
import { InitialRouteIndex, RouteEntriesIndex } from "../common/routes";
import { useTranslation } from "react-i18next";

function NavigationContextMenu({ selectedList, anchorPosition, onClose }) {
  const [state, dispatch] = useContext(AppContext);
  const { t } = useTranslation();

  const handleListDelete = () => {
    dispatch({
      type: ACTION_TYPES.DELETE_LIST,
      payload: { listId: selectedList },
    });
    onClose();
  };

  return (
    <Menu
      open={anchorPosition != null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        anchorPosition !== null
          ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
          : undefined
      }
    >
      <MenuItem dense disabled={selectedList === null}>
        <ListItemIcon>
          <FlipOutlined />
        </ListItemIcon>
        <ListItemText>{t("rename-list")}</ListItemText>
      </MenuItem>
      <MenuItem dense>
        <ListItemIcon>
          <PrintOutlined />
        </ListItemIcon>
        <ListItemText>{t("print-list")}</ListItemText>
      </MenuItem>
      <Divider></Divider>
      <MenuItem
        onClick={handleListDelete}
        dense
        disabled={state.lists.length <= 1 || selectedList === null}
      >
        <ListItemIcon>
          <DeleteOutlined />
        </ListItemIcon>
        <ListItemText>{t("delete-list")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}

function NavigationPane() {
  const [state] = useContext(AppContext);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(InitialRouteIndex);
  const theme = useTheme();

  const selectedList = useMemo(() => {
    const listIndex = selectedIndex - RouteEntriesIndex.LISTS;
    return listIndex >= 0 && listIndex < state.lists.length
      ? state.lists[listIndex].id
      : null;
  }, [selectedIndex, state.lists]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.target.click();
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX, mouseY: event.clientY }
        : null
    );
  };

  return (
    <nav onContextMenu={handleContextMenu}>
      <List>
        {state.lists.map((list, index) => {
          const listIndex = index + RouteEntriesIndex.LISTS;
          const badgeCount = list.items.filter(
            (item) => !item.isCompleted
          ).length;
          return (
            <ListItem key={list.id} dense disablePadding>
              <ListItemButton
                sx={{ color: theme.palette.text.primary }}
                component={Link}
                to={`/lists/${index}`}
                selected={selectedIndex === listIndex}
                onClick={() => setSelectedIndex(listIndex)}
              >
                <ListItemIcon>
                  <ListIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={list.name} />
                {badgeCount > 0 ? (
                  <Typography aria-hidden variant="caption">
                    {badgeCount}
                  </Typography>
                ) : null}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <NavigationContextMenu
        selectedList={selectedList}
        anchorPosition={contextMenu}
        onClose={() => setContextMenu(null)}
      ></NavigationContextMenu>
    </nav>
  );
}

export default NavigationPane;
