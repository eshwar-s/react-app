import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../common/context";
import TaskList from "./task-list";
import AddTask from "./add-task";
import { ACTION_TYPES } from "../common/actions";
import Editable from "./editable";
import { DEFAULT_TODO_LIST_NAME } from "../model/todo-list";
import { Navigate, useParams } from "react-router-dom";
import TaskDetails from "./task-details";
import { useTranslation } from "react-i18next";
import OptionsMenu from "./options-menu";
import { TodoItem } from "../model/todo-item";
import { getBackgroundColor, getTextColor } from "../common/colors";
import { useTaskList, useTodoLists } from "../common/hooks";
import Collapsible from "./collapsible";
import { ROUTE } from "../common/routes";

export function TodoListView() {
  const [state] = useContext(AppContext);
  const { index } = useParams();
  const lists = useTodoLists(state.lists);

  return index < lists.length ? (
    <ListView list={lists[index]} />
  ) : (
    <Navigate to={`${ROUTE.LISTS}/${lists.length - 1}`} />
  );
}

export function TasksListView() {
  const [state] = useContext(AppContext);
  const taskList = useTaskList(state.lists);
  return <ListView list={taskList} />;
}

function ListView({ list }) {
  const [state, dispatch] = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const theme = useTheme();
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
              disabled={list.builtIn}
              placeholder={DEFAULT_TODO_LIST_NAME}
              onChanged={handleListNameChanged}
            ></Editable>
            <OptionsMenu list={list} />
          </Box>
          <Box>
            <TaskList
              tasks={incompleteTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              showListName={false}
            />
            {completedTasks.length > 0 && state.settings.showCompleted ? (
              <Collapsible label={t("completed")} size="small">
                <TaskList
                  tasks={completedTasks}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  showListName={false}
                />
              </Collapsible>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ flexShrink: "0" }}>
          <AddTask listId={list.id} setImportant={false} setDueDate={false} />
        </Box>
      </Box>
      <Box role="complementary">
        <TaskDetails
          sx={{ flexShrink: "0" }}
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
    bgcolor: getBackgroundColor(theme),
    height: "100%",
    padding: "12px",
  };
}
