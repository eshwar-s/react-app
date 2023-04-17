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
import { Button, Divider, Menu, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTextColor } from "./list-view";
import DeleteList from "./delete-list";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { TodoSortOrder } from "../model/todo-settings";
import { StyledMenuItem, SubMenuItem } from "./menu-item";
import ThemePicker from "./theme-picker";

function ListMenu({ list }) {
  const [state, dispatch] = useContext(AppContext);
  const [anchorElement, setAnchorElement] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSelectingTheme, setIsSelectingTheme] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const toggleShowCompletedTasks = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SHOW_COMPLETED_TASKS,
      payload: null,
    });
    setAnchorElement(null);
  };

  const setTaskSortOrder = (sortOrder) => {
    dispatch({
      type: ACTION_TYPES.SET_TASK_SORT_ORDER,
      payload: sortOrder,
    });
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        id="list-menu-button"
        sx={{ color: getTextColor(theme) }}
        disableElevation
        size="small"
        aria-label={t("menu")}
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
      >
        <StyledMenuItem
          text={t("renameList")}
          startIcon={<FlipOutlined />}
          onClick={() => setAnchorElement(null)}
        />
        <SubMenuItem text={t("sortList")} startIcon={<SortOutlined />}>
          <StyledMenuItem
            text={t("alphabetically")}
            startIcon={<SortByAlphaOutlined />}
            onClick={() => setTaskSortOrder(TodoSortOrder.ALPHABETICAL)}
          />
          <StyledMenuItem
            text={t("importance")}
            startIcon={<StarOutline />}
            onClick={() => setTaskSortOrder(TodoSortOrder.IMPORTANCE)}
          />
          <StyledMenuItem
            text={t("creationDate")}
            startIcon={<CalendarMonthOutlined />}
            onClick={() => setTaskSortOrder(TodoSortOrder.CREATION_DATE)}
          />
        </SubMenuItem>
        <StyledMenuItem
          text={t("printList")}
          startIcon={<PrintOutlined />}
          onClick={() => setAnchorElement(null)}
        />
        <StyledMenuItem
          text={t("changeTheme")}
          startIcon={<PaletteOutlined />}
          onClick={() => {
            setIsSelectingTheme(true);
            setAnchorElement(null);
          }}
        />
        <StyledMenuItem
          text={
            state.settings.showCompleted
              ? t("hideCompletedTasks")
              : t("showCompletedTasks")
          }
          startIcon={<CheckCircleOutline />}
          onClick={toggleShowCompletedTasks}
        />
        <Divider sx={{ my: 0.5 }} />
        <StyledMenuItem
          text={t("deleteList")}
          startIcon={<DeleteOutline />}
          onClick={() => {
            setIsDeleting(true);
            setAnchorElement(null);
          }}
        />
      </Menu>
      <DeleteList
        list={list}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
      <ThemePicker
        open={isSelectingTheme}
        onClose={() => setIsSelectingTheme(false)}
      />
    </>
  );
}

export default ListMenu;
