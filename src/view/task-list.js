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
import { alpha, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { ThemeMode } from "../common/theme";
import { useTranslation } from "react-i18next";

function TaskList({ tasks, selectedTask, setSelectedTask, showListName }) {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleSelection = (event, task) => {
    event.stopPropagation();
    setSelectedTask(task.id);
  };

  const toggleCompletion = (event, task) => {
    event.stopPropagation();
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_COMPLETION,
      payload: { listId: task.listId, taskId: task.id },
    });
  };

  const toggleImportance = (event, task) => {
    event.stopPropagation();
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_IMPORTANCE,
      payload: { listId: task.listId, taskId: task.id },
    });
  };

  const getListName = (task) => {
    const list = state.lists.find((list) => list.id === task.listId);
    return list?.name;
  };

  return (
    <List sx={{ width: "100%" }}>
      {tasks.map((task, index) => {
        return (
          <ListItem
            key={index}
            dense
            disablePadding
            secondaryAction={
              <IconButton
                aria-pressed={task.isImportant}
                aria-label={t("importantTask")}
                edge="end"
                onClick={(event) => toggleImportance(event, task)}
              >
                {task.isImportant ? <StarIcon /> : <StarOutlineIcon />}
              </IconButton>
            }
          >
            <ListItemButton
              dense
              sx={getStyle(theme)}
              onClick={(event) => handleSelection(event, task)}
              selected={task.id === selectedTask}
            >
              <ListItemIcon>
                <Checkbox
                  aria-label={t("completeTask")}
                  tabIndex={0}
                  edge="start"
                  checked={task.isCompleted}
                  onClick={(event) => toggleCompletion(event, task)}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
                primary={task.title}
                primaryTypographyProps={{ variant: "body2" }}
                secondary={showListName ? getListName(task) : null}
                secondaryTypographyProps={{ variant: "caption" }}
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
    color: theme.palette.text.primary,
    borderRadius: "4px",
    marginBottom: "2px",
    "&.MuiListItemButton-root": {
      bgcolor:
        theme.palette.mode === ThemeMode.LIGHT
          ? theme.palette.primary.contrastText
          : theme.palette.divider,
    },
    "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible": {
      bgcolor:
        theme.palette.mode === ThemeMode.LIGHT
          ? theme.palette.primary.light
          : alpha(theme.palette.primary.light, 0.3),
    },
    "&.Mui-focusVisible": {
      bgcolor:
        theme.palette.mode === ThemeMode.LIGHT
          ? theme.palette.primary.light
          : alpha(theme.palette.primary.light, 0.3),
    },
  };
}

export default TaskList;
