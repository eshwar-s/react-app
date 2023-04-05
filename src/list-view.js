import { Button, Collapse, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "./context";
import TaskList from "./task-list";
import AddTask from "./add-task";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ACTION_TYPES } from "./actions";
import Editable from "./editable";
import { DEFAULT_TODO_LIST_NAME } from "./model/todo-list";

function ListView({ list }) {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
        height: "100%",
        padding: "12px",
      }}
    >
      <Box sx={{ flex: "1 1 auto", overflowY: "scroll" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Editable
            element={
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  flex: "1 1 auto",
                  fontWeight: "bold",
                  color: theme.palette.background.paper,
                  outline: "0px solid transparent",
                }}
              >
                {list.name}
              </Typography>
            }
            placeholder={DEFAULT_TODO_LIST_NAME}
            onChanged={handleListNameChanged}
          ></Editable>
        </Box>
        <Box>
          <TaskList listId={list.id} tasks={incompleteTasks}></TaskList>
          {completedTasks.length > 0 ? (
            <>
              <Button
                sx={{ color: theme.palette.background.paper }}
                size="small"
                onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                startIcon={showCompletedTasks ? <ExpandMore /> : <ExpandLess />}
              >
                Completed
              </Button>
              <Collapse in={showCompletedTasks}>
                <TaskList listId={list.id} tasks={completedTasks}></TaskList>
              </Collapse>
            </>
          ) : null}
        </Box>
      </Box>
      <Box sx={{ flex: "0 0 auto" }}>
        <AddTask listId={list.id}></AddTask>
      </Box>
    </Box>
  );
}

export default ListView;
