import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";

function TaskList({ listId, tasks }) {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();

  const toggleCompletion = (taskId) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_COMPLETION,
      payload: { listId: listId, taskId: taskId },
    });
  };

  const toggleImportance = (taskId) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_IMPORTANCE,
      payload: { listId: listId, taskId: taskId },
    });
  };

  return (
    <List sx={{ width: "100%" }}>
      {tasks.map((task) => {
        return (
          <ListItem
            key={task.id}
            dense
            disablePadding
            secondaryAction={
              <IconButton edge="end" onClick={() => toggleImportance(task.id)}>
                {task.isImportant ? <StarIcon /> : <StarOutlineIcon />}
              </IconButton>
            }
          >
            <ListItemButton sx={getStyle(theme)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.isCompleted}
                  tabIndex={-1}
                  onClick={() => toggleCompletion(task.id)}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
                primary={task.title}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

function getStyle(theme) {
  return {
    borderRadius: "4px",
    marginBottom: "2px",
    "&.MuiListItemButton-root, &.MuiListItemButton-root:hover": {
      bgcolor: theme.palette.background.paper,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      bgcolor: theme.palette.primary.light,
    },
  };
}

export default TaskList;
