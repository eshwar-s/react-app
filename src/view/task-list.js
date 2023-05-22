import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { darken, lighten, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { ThemeMode } from "../common/theme";
import { useTranslation } from "react-i18next";
import { getShortDate } from "../common/date";
import i18next from "i18next";

function TaskList({ tasks, selectedTask, setSelectedTask, showListName }) {
  const [, dispatch] = useContext(AppContext);
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
              sx={getButtonStyle(theme)}
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
                disableTypography
                primary={<TaskTitle task={task} />}
                secondary={
                  <TaskDescription task={task} showListName={showListName} />
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

function TaskTitle({ task }) {
  const isPrinting = useMediaQuery("print");

  return (
    <Typography
      variant="body2"
      sx={{
        textDecoration:
          task.isCompleted && !isPrinting ? "line-through" : "none",
      }}
    >
      {task.title}
    </Typography>
  );
}

function TaskDescription({ task, showListName }) {
  const [state] = useContext(AppContext);
  const theme = useTheme();
  const textStyle = { color: "inherit", opacity: 0.7, marginInlineEnd: "4px" };
  const isTaskOverdue = !task.isCompleted ? task.dueDate < Date.now() : false;

  const getListName = (task) => {
    const list = state.lists.find((list) => list.id === task.listId);
    return list?.name;
  };

  return (
    <Box>
      {showListName ? (
        <Typography variant="caption" sx={textStyle}>
          {getListName(task)}
        </Typography>
      ) : null}
      {showListName && task.dueDate ? (
        <Typography variant="caption" sx={textStyle}>
          &#8226;
        </Typography>
      ) : null}
      {task.dueDate ? (
        <Typography
          variant="caption"
          sx={{
            color: isTaskOverdue ? theme.palette.error.main : textStyle.color,
            opacity: isTaskOverdue ? 1 : textStyle.opacity,
            marginInlineEnd: textStyle.marginInlineEnd,
          }}
        >
          {getShortDate(i18next.language, task.dueDate)}
        </Typography>
      ) : null}
    </Box>
  );
}

function getButtonStyle(theme) {
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
          ? lighten(theme.palette.primary.light, 0.5)
          : darken(theme.palette.primary.light, 0.6),
    },
    "&.Mui-focusVisible": {
      bgcolor:
        theme.palette.mode === ThemeMode.LIGHT
          ? lighten(theme.palette.primary.light, 0.5)
          : darken(theme.palette.primary.light, 0.6),
    },
  };
}

export default TaskList;
