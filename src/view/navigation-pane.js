import {
  CalendarMonthOutlined as CalendarIcon,
  DeleteOutlined as DeleteIcon,
  FlagOutlined as FlagIcon,
  FlipOutlined as FlipIcon,
  List as ListIcon,
  PrintOutlined as PrintIcon,
  StarOutline as StarIcon,
  TaskOutlined as TaskIcon,
  WbSunnyOutlined as DayIcon,
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
import { ROUTE } from "../common/routes";
import { GetThemeColor, getPrimaryColor } from "../common/colors";

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
          startIcon={<FlipIcon />}
          onClick={() => onClose()}
          disabled={selectedList === null}
        />
        <IconMenuItem
          text={t("printList")}
          startIcon={<PrintIcon />}
          onClick={() => onClose()}
        />
        <Divider sx={{ my: 0.5 }} />
        <IconMenuItem
          text={t("deleteList")}
          startIcon={<DeleteIcon />}
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

function NavigationMenuItem({ name, link, icon, badgeCount = 0 }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const selected = pathname === link;

  return (
    <MenuItem
      dense
      sx={{ color: theme.palette.text.primary }}
      component={Link}
      to={link}
      selected={selected}
      tabIndex={selected ? 0 : -1}
    >
      <ListItemIcon sx={{ pointerEvents: "none" }}>{icon}</ListItemIcon>
      <ListItemText
        primary={name}
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
}

function NavigationMenuItemIcon({ route }) {
  const [state] = useContext(AppContext);
  const color = getPrimaryColor(GetThemeColor(route, state.settings)).main;

  switch (route) {
    case ROUTE.MY_DAY:
      return <DayIcon sx={{ color: color }} />;

    case ROUTE.IMPORTANT:
      return <StarIcon sx={{ color: color }} />;

    case ROUTE.PLANNED:
      return <CalendarIcon sx={{ color: color }} />;

    case ROUTE.FLAGGED:
      return <FlagIcon sx={{ color: color }} />;

    case ROUTE.TASKS:
      return <TaskIcon sx={{ color: color }} />;

    case ROUTE.LISTS:
      return <ListIcon sx={{ color: color }} />;
  }
  return null;
}

function NavigationPane() {
  const [state] = useContext(AppContext);
  const [contextMenu, setContextMenu] = useState(null);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const lists = useMemo(() => {
    return state.lists.filter((list) => !list.builtIn);
  }, [state.lists]);

  const selectedList = useMemo(() => {
    const match = matchPath(`${ROUTE.LISTS}/:index`, pathname);
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
        <NavigationMenuItem
          name={t("myDay")}
          link={ROUTE.MY_DAY}
          icon={<NavigationMenuItemIcon route={ROUTE.MY_DAY} />}
        />
        <NavigationMenuItem
          name={t("important")}
          link={ROUTE.IMPORTANT}
          icon={<NavigationMenuItemIcon route={ROUTE.IMPORTANT} />}
        />
        <NavigationMenuItem
          name={t("planned")}
          link={ROUTE.PLANNED}
          icon={<NavigationMenuItemIcon route={ROUTE.PLANNED} />}
        />
        <NavigationMenuItem
          name={t("flagged")}
          link={ROUTE.FLAGGED}
          icon={<NavigationMenuItemIcon route={ROUTE.FLAGGED} />}
        />
        <NavigationMenuItem
          name={t("tasks")}
          link={ROUTE.TASKS}
          icon={<NavigationMenuItemIcon route={ROUTE.TASKS} />}
        />
        <Divider></Divider>
        {lists.map((list, index) => {
          const link = `/lists/${index}`;
          const badgeCount = list.items.filter(
            (item) => !item.isCompleted
          ).length;
          return (
            <NavigationMenuItem
              key={index}
              name={list.name}
              link={link}
              icon={<NavigationMenuItemIcon route={ROUTE.LISTS} />}
              badgeCount={badgeCount}
            ></NavigationMenuItem>
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
