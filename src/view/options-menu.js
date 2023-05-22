import {
  CalendarMonthOutlined,
  CheckCircleOutline,
  DeleteOutline,
  FlipOutlined,
  MoreHoriz,
  PaletteOutlined,
  PrintOutlined,
  SortByAlphaOutlined,
  SortOutlined,
  StarOutline,
} from "@mui/icons-material";
import { Divider, IconButton, Menu, useTheme } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteListDialog from "./delete-dialog";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { TodoSortOrder } from "../model/todo-settings";
import { IconMenuItem } from "./menu-item";
import ThemePicker from "./theme-picker";
import { SubMenu } from "./sub-menu";
import { getTextColor } from "../common/colors";

function OptionsMenu({ list }) {
  const [state, dispatch] = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const buttonRef = useRef();
  const theme = useTheme();
  const { t } = useTranslation();

  const toggleShowCompletedTasks = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SHOW_COMPLETED_TASKS,
      payload: null,
    });
    setMenuOpen(false);
  };

  const setTaskSortOrder = (sortOrder) => {
    dispatch({
      type: ACTION_TYPES.SET_TASK_SORT_ORDER,
      payload: sortOrder,
    });
    setMenuOpen(false);
  };

  const openPrintDialog = () => {
    setTimeout(() => window.print(), 0);
    setMenuOpen(false);
  };

  const openDeleteListDialog = () => {
    setDeleteDialogOpen(true);
    setMenuOpen(false);
  };

  const openThemePickerDialog = () => {
    setThemePickerOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <IconButton
        id="list-menu-button"
        ref={buttonRef}
        sx={{ color: getTextColor(theme) }}
        size="small"
        aria-label={t("menu")}
        aria-haspopup="true"
        onClick={() => setMenuOpen(true)}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="list-menu"
        MenuListProps={{
          "aria-labelledby": "list-menu-button",
        }}
        anchorEl={buttonRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        variant="selectedMenu"
      >
        {list && !list.builtIn && (
          <IconMenuItem
            text={t("renameList")}
            startIcon={<FlipOutlined />}
            onClick={() => setMenuOpen(false)}
          />
        )}
        <SubMenu
          parentMenuOpen={menuOpen}
          text={t("sortList")}
          startIcon={<SortOutlined />}
        >
          <IconMenuItem
            text={t("alphabetically")}
            startIcon={<SortByAlphaOutlined />}
            onClick={() => setTaskSortOrder(TodoSortOrder.ALPHABETICAL)}
          />
          <IconMenuItem
            text={t("importance")}
            startIcon={<StarOutline />}
            onClick={() => setTaskSortOrder(TodoSortOrder.IMPORTANCE)}
          />
          <IconMenuItem
            text={t("creationDate")}
            startIcon={<CalendarMonthOutlined />}
            onClick={() => setTaskSortOrder(TodoSortOrder.CREATION_DATE)}
          />
        </SubMenu>
        <IconMenuItem
          text={t("printList")}
          startIcon={<PrintOutlined />}
          onClick={openPrintDialog}
        />
        {list && !list.builtIn && (
          <IconMenuItem
            text={t("changeTheme")}
            startIcon={<PaletteOutlined />}
            onClick={openThemePickerDialog}
          />
        )}
        <IconMenuItem
          text={
            state.settings.showCompleted
              ? t("hideCompletedTasks")
              : t("showCompletedTasks")
          }
          startIcon={<CheckCircleOutline />}
          onClick={toggleShowCompletedTasks}
        />
        {list && !list.builtIn && <Divider sx={{ my: 0.5 }} />}
        {list && !list.builtIn && (
          <IconMenuItem
            text={t("deleteList")}
            startIcon={<DeleteOutline />}
            onClick={openDeleteListDialog}
          />
        )}
      </Menu>
      <DeleteListDialog
        list={list}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
      <ThemePicker
        open={themePickerOpen}
        onClose={() => setThemePickerOpen(false)}
      />
    </>
  );
}

export default OptionsMenu;
