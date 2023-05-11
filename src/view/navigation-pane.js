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
import DeleteListDialog from "./delete-dialog";
import { IconMenuItem } from "./menu-item";
import { ROUTE } from "../common/routes";
import { GetThemeColor, getPrimaryColor } from "../common/colors";
import { BUILTIN_LISTS_COUNT } from "../model/todo-list";
import {
  useFlaggedList,
  useImportantTasks,
  useTaskList,
  useTodoLists,
} from "../common/hooks";

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
  const lists = useTodoLists(state.lists);
  const taskList = useTaskList(state.lists);
  const flaggedList = useFlaggedList(state.lists);
  const importantTasks = useImportantTasks(state.lists);

  const selectedList = useMemo(() => {
    const match = matchPath(`${ROUTE.LISTS}/:index`, pathname);
    return match && match.params.index < lists.length
      ? lists[match.params.index]
      : null;
  }, [lists, pathname]);

  const getImportantBadgeCount = () => {
    return importantTasks.filter((item) => !item.isCompleted).length;
  };

  const getListBadgeCount = (list) => {
    return list.items.filter((item) => !item.isCompleted).length;
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
          badgeCount={getImportantBadgeCount()}
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
          badgeCount={getListBadgeCount(flaggedList)}
        />
        <NavigationMenuItem
          name={t("tasks")}
          link={ROUTE.TASKS}
          icon={<NavigationMenuItemIcon route={ROUTE.TASKS} />}
          badgeCount={getListBadgeCount(taskList)}
        />
        <Divider></Divider>
        {lists.map((list, index) => {
          const link = `/lists/${index}`;
          return (
            <NavigationMenuItem
              key={index}
              name={list.name}
              link={link}
              icon={<NavigationMenuItemIcon route={ROUTE.LISTS} />}
              badgeCount={getListBadgeCount(list)}
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
