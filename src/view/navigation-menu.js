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
  darken,
  lighten,
  useTheme,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../common/context";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteListDialog from "./delete-dialog";
import { IconMenuItem } from "./menu-item";
import { ROUTE } from "../common/routes";
import { GetThemeColor, getPrimaryColor } from "../common/colors";
import { BUILTIN_LISTS_COUNT } from "../model/todo-list";
import {
  useFlaggedList,
  useImportantTasks,
  usePlannedTasks,
  useTaskList,
  useTodoLists,
} from "../common/hooks";
import { ThemeMode } from "../common/theme";

function NavigationContextMenu({ selectedList, anchorPosition, onClose }) {
  const [state] = useContext(AppContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openPrintDialog = () => {
    setTimeout(() => window.print(), 0);
    onClose();
  };

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
          onClick={openPrintDialog}
        />
        <Divider sx={{ my: 0.5 }} />
        <IconMenuItem
          text={t("deleteList")}
          startIcon={<DeleteIcon />}
          onClick={openDeleteListDialog}
          disabled={
            state.lists.length <= BUILTIN_LISTS_COUNT + 1 ||
            selectedList === null
          }
        />
      </Menu>
      <DeleteListDialog
        list={selectedList}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}

function getMenuItemStyle(theme) {
  const selectionColor =
    theme.palette.mode === ThemeMode.LIGHT
      ? darken(theme.palette.secondary.main, 0.05)
      : lighten(theme.palette.secondary.main, 0.05);

  return {
    "&.Mui-selected, &.Mui-selected:hover": {
      bgcolor: selectionColor,
    },
    "&.Mui-selected.Mui-focusVisible, &.Mui-focusVisible": {
      bgcolor: selectionColor,
    },
    color: theme.palette.text.primary,
  };
}

function NavigationMenuItem({ name, link, icon, badgeCount = 0 }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const selected = pathname === link;

  return (
    <MenuItem
      dense
      component={Link}
      to={link}
      selected={selected}
      tabIndex={selected ? 0 : -1}
      sx={getMenuItemStyle(theme)}
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

    default:
      return null;
  }
}

function NavigationMenu() {
  const [state] = useContext(AppContext);
  const [contextMenu, setContextMenu] = useState(null);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const lists = useTodoLists(state.lists);
  const taskList = useTaskList(state.lists);
  const flaggedList = useFlaggedList(state.lists);
  const importantTasks = useImportantTasks(state.lists, false);
  const plannedTasks = usePlannedTasks(state.lists, false);

  const selectedList = useMemo(() => {
    const match = matchPath(`${ROUTE.LISTS}/:index`, pathname);
    return match && match.params.index < lists.length
      ? lists[match.params.index]
      : null;
  }, [lists, pathname]);

  const getBadgeCount = (tasks) => {
    return tasks.filter((item) => !item.isCompleted).length;
  };

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
          badgeCount={importantTasks.length}
        />
        <NavigationMenuItem
          name={t("planned")}
          link={ROUTE.PLANNED}
          icon={<NavigationMenuItemIcon route={ROUTE.PLANNED} />}
          badgeCount={plannedTasks.length}
        />
        <NavigationMenuItem
          name={t("flagged")}
          link={ROUTE.FLAGGED}
          icon={<NavigationMenuItemIcon route={ROUTE.FLAGGED} />}
          badgeCount={getBadgeCount(flaggedList.items)}
        />
        <NavigationMenuItem
          name={t("tasks")}
          link={ROUTE.TASKS}
          icon={<NavigationMenuItemIcon route={ROUTE.TASKS} />}
          badgeCount={getBadgeCount(taskList.items)}
        />
        <Divider></Divider>
        {lists.map((list, index) => {
          const link = `${ROUTE.LISTS}/${index}`;
          return (
            <NavigationMenuItem
              key={index}
              name={list.name}
              link={link}
              icon={<NavigationMenuItemIcon route={ROUTE.LISTS} />}
              badgeCount={getBadgeCount(list.items)}
            />
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

export default NavigationMenu;
