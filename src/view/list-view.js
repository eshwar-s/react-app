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
import { useParams } from "react-router-dom";
import TaskDetails from "./task-details";
import { useTranslation } from "react-i18next";
import { ThemeMode } from "../common/theme";
import ListMenu from "./list-menu";

function SelectedListView() {
  const [state] = useContext(AppContext);
  const { selectedIndex } = useParams();

  return selectedIndex < state.lists.length ? (
    <ListView list={state.lists[selectedIndex]} />
  ) : null;
}

function ListView({ list }) {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const { t } = useTranslation();

  const incompleteTasks = useMemo(() => {
    return list.items.filter((item) => {
      return !item.isCompleted;
    });
  }, [list]);

  const completedTasks = useMemo(() => {
    return list.items.filter((item) => {
      return item.isCompleted;
    });
  }, [list]);

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
        <Box sx={{ flex: "1 1 auto", overflowY: "scroll" }}>
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
                  variant="h5"
                  gutterBottom
                  sx={{
                    flex: "1 1 auto",
                    fontWeight: "bold",
                    color: getTextColor(theme),
                    outline: "0px solid transparent",
                  }}
                >
                  {list.name}
                </Typography>
              }
              placeholder={DEFAULT_TODO_LIST_NAME}
              onChanged={handleListNameChanged}
            ></Editable>
            <ListMenu></ListMenu>
          </Box>
          <Box>
            <TaskList
              listId={list.id}
              tasks={incompleteTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            ></TaskList>
            {completedTasks.length > 0 ? (
              <>
                <Button
                  sx={{ color: getTextColor(theme) }}
                  size="small"
                  onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                  startIcon={
                    showCompletedTasks ? <ExpandMore /> : <ExpandLess />
                  }
                >
                  {t("completed")}
                </Button>
                <Collapse in={showCompletedTasks}>
                  <TaskList
                    listId={list.id}
                    tasks={completedTasks}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                  ></TaskList>
                </Collapse>
              </>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ flex: "0 0 auto" }}>
          <AddTask listId={list.id}></AddTask>
        </Box>
      </Box>
      <Box>
        <TaskDetails
          list={list}
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        ></TaskDetails>
      </Box>
    </Box>
  );
}

function getStyle(theme) {
  return {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
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
