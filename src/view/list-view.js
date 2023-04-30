import { Button, Collapse, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../common/context";
import TaskList from "./task-list";
import AddTask from "./add-task";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ACTION_TYPES } from "../common/actions";
import Editable from "./editable";
import { DEFAULT_TODO_LIST_NAME } from "../model/todo-list";
import { Navigate, useParams } from "react-router-dom";
import TaskDetails from "./task-details";
import { useTranslation } from "react-i18next";
import { ThemeMode } from "../common/theme";
import ListMenu from "./list-menu";
import { TodoItem } from "../model/todo-item";

function SelectedListView() {
  const [state] = useContext(AppContext);
  const { selectedIndex } = useParams();

  return selectedIndex < state.lists.length ? (
    <ListView list={state.lists[selectedIndex]} />
  ) : (
    <Navigate to={`/lists/${state.lists.length - 1}`} />
  );
}

function ListView({ list }) {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const [collapseCompleted, setCollapseCompleted] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { t } = useTranslation();

  const incompleteTasks = useMemo(() => {
    return list.items
      .sort((a, b) => TodoItem.compare(a, b, state.settings.sortOrder))
      .filter((item) => {
        return !item.isCompleted;
      });
  }, [list, state.settings.sortOrder]);

  const completedTasks = useMemo(() => {
    return list.items
      .sort((a, b) => TodoItem.compare(a, b, state.settings.sortOrder))
      .filter((item) => {
        return item.isCompleted;
      });
  }, [list, state.settings.sortOrder]);

  const handleListNameChanged = (listName) => {
    dispatch({
      type: ACTION_TYPES.RENAME_LIST,
      payload: {
        listId: list.id,
        listName: listName,
      },
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <Box sx={getStyle(theme)}>
        <Box sx={{ overflowY: "scroll" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Editable
              element={
                <Typography
                  id="list-name"
                  variant="h5"
                  gutterBottom
                  noWrap
                  sx={{
                    fontWeight: "bold",
                    color: getTextColor(theme),
                    outline: "0px solid transparent",
                    userSelect: "none",
                  }}
                >
                  {list.name}
                </Typography>
              }
              placeholder={DEFAULT_TODO_LIST_NAME}
              onChanged={handleListNameChanged}
            ></Editable>
            <ListMenu list={list} />
          </Box>
          <Box>
            <TaskList
              listId={list.id}
              tasks={incompleteTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
            {completedTasks.length > 0 && state.settings.showCompleted ? (
              <>
                <Button
                  sx={{ color: getTextColor(theme) }}
                  size="small"
                  onClick={() => setCollapseCompleted(!collapseCompleted)}
                  startIcon={
                    collapseCompleted ? <ExpandLess /> : <ExpandMore />
                  }
                >
                  {t("completed")}
                </Button>
                <Collapse in={!collapseCompleted}>
                  <TaskList
                    listId={list.id}
                    tasks={completedTasks}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                  />
                </Collapse>
              </>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ flexShrink: "0" }}>
          <AddTask listId={list.id} />
        </Box>
      </Box>
      <Box>
        <TaskDetails
          sx={{ flexShrink: "0" }}
          list={list}
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      </Box>
    </Box>
  );
}

function getStyle(theme) {
  return {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    overflow: "hidden",
    justifyContent: "space-between",
    bgcolor:
      theme.palette.mode === ThemeMode.LIGHT
        ? theme.palette.primary.main
        : theme.palette.background.default,
    height: "100%",
    padding: "12px",
  };
}

export function getTextColor(theme) {
  return theme.palette.mode === ThemeMode.LIGHT
    ? theme.palette.primary.contrastText
    : theme.palette.primary.main;
}

export default SelectedListView;
