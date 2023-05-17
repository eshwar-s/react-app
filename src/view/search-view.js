import { useSearchParams } from "react-router-dom";
import { getBackgroundColor } from "../common/colors";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../common/context";
import TaskList from "./task-list";
import TaskDetails from "./task-details";

function SearchView() {
  const [state] = useContext(AppContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  const matchingTasks = useMemo(() => {
    return state.lists.flatMap((list) => {
      return list.items.filter(
        (item) => item.title.indexOf(searchQuery) !== -1
      );
    });
  }, [state.lists, searchQuery]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <Box role="main" sx={getStyle(theme)}>
        <Box sx={{ overflowY: "scroll" }}>
          <TaskList
            tasks={matchingTasks}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            showListName={true}
          />
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

export default SearchView;
