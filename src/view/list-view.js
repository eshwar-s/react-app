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
import ListMenu from "./list-menu";
import { TodoItem } from "../model/todo-item";
import { getBackgroundColor, getTextColor } from "../common/colors";

function SelectedListView() {
  const [state] = useContext(AppContext);
  const { selectedIndex } = useParams();

  const lists = useMemo(() => {
    return state.lists.filter((list) => !list.builtIn);
  }, [state.lists]);

  return selectedIndex < lists.length ? (
    <ListView list={lists[selectedIndex]} />
  ) : (
    <Navigate to={`/lists/${lists.length - 1}`} />
  );
}

function ListView({ list }) {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const [collapseCompleted, setCollapseCompleted] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
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

  const selectedTask = useMemo(() => {
    if (selectedTaskId) {
      const index = list.items.findIndex((task) => task.id === selectedTaskId);
      if (index !== -1) {
        return list.items[index];
      }
    }
    return null;
  }, [list, selectedTaskId]);

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
      <Box role="main" sx={getStyle(theme)}>
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
              tasks={incompleteTasks}
              selectedTask={selectedTaskId}
              setSelectedTask={setSelectedTaskId}
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
                    tasks={completedTasks}
                    selectedTask={selectedTaskId}
                    setSelectedTask={setSelectedTaskId}
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
      <Box role="complementary">
        <TaskDetails
          sx={{ flexShrink: "0" }}
          task={selectedTask}
          onClose={() => setSelectedTaskId(null)}
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
    bgcolor: getBackgroundColor(theme),
    height: "100%",
    padding: "12px",
  };
}

export default SelectedListView;
