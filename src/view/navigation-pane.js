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
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../common/context";
import { Link } from "react-router-dom";
import { InitialRouteIndex, RouteEntriesIndex } from "../common/routes";
import { useTranslation } from "react-i18next";
import DeleteList from "./delete-list";
import { StyledMenuItem } from "./menu-item";

function NavigationContextMenu({ selectedList, anchorPosition, onClose }) {
  const [state] = useContext(AppContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Menu
        open={anchorPosition !== null}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorPosition !== null
            ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
            : undefined
        }
      >
        <StyledMenuItem
          text={t("renameList")}
          startIcon={<FlipOutlined />}
          onClick={() => onClose()}
          disabled={selectedList === null}
        />
        <StyledMenuItem
          text={t("printList")}
          startIcon={<PrintOutlined />}
          onClick={() => onClose()}
        />
        <Divider sx={{ my: 0.5 }} />
        <StyledMenuItem
          text={t("deleteList")}
          startIcon={<DeleteOutlined />}
          onClick={() => {
            setIsDeleting(true);
            onClose();
          }}
          disabled={state.lists.length <= 1 || selectedList === null}
        />
      </Menu>
      <DeleteList
        list={selectedList}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      ></DeleteList>
    </>
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
      ? state.lists[listIndex]
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
