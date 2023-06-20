import { getBackgroundColor } from "../common/colors";
import { useTranslation } from "react-i18next";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Heading } from "./heading";
import TaskList from "./task-list";
import TaskDetails from "./task-details";
import {
  useImportantTasks,
  useMyDayTasks,
  usePlannedTasks,
  useTaskList,
} from "../common/hooks";
import { useContext, useState } from "react";
import { AppContext } from "../common/context";
import AddTask from "./add-task";
import OptionsMenu from "./options-menu";

export function MyDayView() {
  const [state] = useContext(AppContext);
  const { t } = useTranslation();
  const myDayTasks = useMyDayTasks(state.lists, state.settings.showCompleted);
  const taskList = useTaskList(state.lists);

  return (
    <TasksView
      heading={t("myDay")}
      tasks={myDayTasks}
      addTaskProps={{
        listId: taskList.id,
        setImportant: false,
        setDueDate: false,
      }}
    />
  );
}

export function ImportantView() {
  const [state] = useContext(AppContext);
  const { t } = useTranslation();
  const importantTasks = useImportantTasks(
    state.lists,
    state.settings.showCompleted
  );
  const taskList = useTaskList(state.lists);

  return (
    <TasksView
      heading={t("important")}
      tasks={importantTasks}
      addTaskProps={{
        listId: taskList.id,
        setImportant: true,
        setDueDate: false,
      }}
    />
  );
}

export function PlannedView() {
  const [state] = useContext(AppContext);
  const { t } = useTranslation();
  const plannedTasks = usePlannedTasks(
    state.lists,
    state.settings.showCompleted
  );
  const taskList = useTaskList(state.lists);

  return (
    <TasksView
      heading={t("planned")}
      tasks={plannedTasks}
      addTaskProps={{
        listId: taskList.id,
        setImportant: false,
        setDueDate: true,
      }}
    />
  );
}

function TasksView({ heading, tasks, addTaskProps }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const theme = useTheme();
  const isPrinting = useMediaQuery("print");

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
            <Heading text={heading} />
            <OptionsMenu list={null} />
          </Box>
          <Box>
            <TaskList
              tasks={tasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              showListName={!isPrinting}
            />
          </Box>
        </Box>
        <Box sx={{ flexShrink: "0" }}>
          <AddTask {...addTaskProps} />
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
