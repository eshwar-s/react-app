import { getBackgroundColor } from "../common/colors";
import { useTranslation } from "react-i18next";
import { Box, useTheme } from "@mui/material";
import { Heading } from "./heading";
import TaskList from "./task-list";
import TaskDetails from "./task-details";
import {
  useImportantTasks,
  usePlannedTasks,
  useTaskList,
} from "../common/hooks";
import { useContext, useState } from "react";
import { AppContext } from "../common/context";
import AddTask from "./add-task";

export function MyDayView() {
  const { t } = useTranslation();
  return <TasksView heading={t("myDay")} tasks={[]} />;
}

export function ImportantView() {
  const [state] = useContext(AppContext);
  const { t } = useTranslation();
  const importantTasks = useImportantTasks(state.lists);

  return <TasksView heading={t("important")} tasks={importantTasks} />;
}

export function PlannedView() {
  const [state] = useContext(AppContext);
  const { t } = useTranslation();
  const plannedTasks = usePlannedTasks(state.lists);

  return <TasksView heading={t("planned")} tasks={plannedTasks} />;
}

function TasksView({ heading, tasks }) {
  const [state] = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const theme = useTheme();
  const taskList = useTaskList(state.lists);

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
          </Box>
          <Box>
            <TaskList
              tasks={tasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              showListName={true}
            />
          </Box>
        </Box>
        <Box sx={{ flexShrink: "0" }}>
          <AddTask listId={taskList.id} />
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
