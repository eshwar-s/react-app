import {
  DeleteOutlined,
  FlipOutlined,
  List as ListIcon,
  PrintOutlined,
} from "@mui/icons-material";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../common/context";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteList from "./delete-list";
import { IconMenuItem } from "./menu-item";

function NavigationContextMenu({ selectedList, anchorPosition, onClose }) {
  const [state] = useContext(AppContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openDeleteListDialog = () => {
    setDeleteDialogOpen(true);
    onClose();
  };

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
        <IconMenuItem
          text={t("renameList")}
          startIcon={<FlipOutlined />}
          onClick={() => onClose()}
          disabled={selectedList === null}
        />
        <IconMenuItem
          text={t("printList")}
          startIcon={<PrintOutlined />}
          onClick={() => onClose()}
        />
        <Divider sx={{ my: 0.5 }} />
        <IconMenuItem
          text={t("deleteList")}
          startIcon={<DeleteOutlined />}
          onClick={openDeleteListDialog}
          disabled={state.lists.length <= 1 || selectedList === null}
        />
      </Menu>
      <DeleteList
        list={selectedList}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}

function NavigationPane() {
  const [state] = useContext(AppContext);
  const [contextMenu, setContextMenu] = useState(null);
  const { pathname } = useLocation();
  const theme = useTheme();

  const selectedList = useMemo(() => {
    const match = matchPath("/lists/:index", pathname);
    return match && match.params.index < state.lists.length
      ? state.lists[match.params.index]
      : null;
  }, [state.lists, pathname]);

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
      <MenuList>
        {state.lists.map((list, index) => {
          const link = `/lists/${index}`;
          const badgeCount = list.items.filter(
            (item) => !item.isCompleted
          ).length;
          return (
            <MenuItem
              key={index}
              sx={{ color: theme.palette.text.primary }}
              component={Link}
              to={link}
              selected={pathname === link}
            >
              <ListItemIcon sx={{ pointerEvents: "none" }}>
                <ListIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={list.name}
                primaryTypographyProps={{
                  noWrap: true,
                  variant: "body2",
                }}
              />
              {badgeCount > 0 ? (
                <Typography aria-hidden variant="caption">
                  {badgeCount}
                </Typography>
              ) : null}
            </MenuItem>
          );
        })}
      </MenuList>
      <NavigationContextMenu
        selectedList={selectedList}
        anchorPosition={contextMenu}
        onClose={() => setContextMenu(null)}
      />
    </nav>
  );
}

export default NavigationPane;
