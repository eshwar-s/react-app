import { Collapse, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext, useMemo } from "react";
import { AppContext } from "./context";
import TaskList from "./task-list";
import AddTask from "./add-task";

function ListView() {
  const [state] = useContext(AppContext);
  const theme = useTheme();

  const selectedListName =
    state.selectedList < state.lists.length
      ? state.lists[state.selectedList].name
      : "";

  const incompleteTasks = useMemo(() => {
    if (state.selectedList >= state.lists.length) {
      return [];
    }
    return state.lists[state.selectedList].items.filter((item) => {
      return !item.isCompleted;
    });
  }, [state.selectedList, state.lists]);

  const completedTasks = useMemo(() => {
    if (state.selectedList >= state.lists.length) {
      return [];
    }
    return state.lists[state.selectedList].items.filter((item) => {
      return item.isCompleted;
    });
  }, [state.selectedList, state.lists]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
        height: "100%",
        padding: "12px",
      }}
    >
      <Box sx={{ flexGrow: "1", overflowY: "scroll" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.background.paper }}
        >
          {selectedListName}
        </Typography>
        <Box>
          <TaskList tasks={incompleteTasks}></TaskList>
          <Collapse in={true}>
            <TaskList tasks={completedTasks}></TaskList>
          </Collapse>
        </Box>
      </Box>
      <Box sx={{ flexShrink: "0" }}>
        <AddTask></AddTask>
      </Box>
    </Box>
  );
}

export default ListView;
