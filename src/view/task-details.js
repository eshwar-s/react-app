import {
  ChevronRight,
  DeleteOutline,
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  ClickAwayListener,
  Divider,
  IconButton,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import Editable from "./editable";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { getFullDate } from "../common/date";
import { TaskDatePicker, TaskDateTimePicker } from "./date-picker";
import moment from "moment";

function TaskDetails({ taskId, onClose }) {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const { t } = useTranslation();
  const task = useSelectedTask(taskId, state.lists);

  const getTaskDate = (task) => {
    if (task.isCompleted) {
      return t("completedDate", {
        date: getFullDate(i18next.language, task.completionDate),
      });
    } else {
      return t("createdDate", {
        date: getFullDate(i18next.language, task.creationDate),
      });
    }
  };

  const handleTitleUpdated = (taskTitle) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK_TITLE,
      payload: { listId: task.listId, taskId: task.id, taskTitle: taskTitle },
    });
  };

  const handleTaskNotes = (event) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK_NOTES,
      payload: {
        listId: task.listId,
        taskId: task.id,
        taskNotes: event.target.value,
      },
    });
  };

  const toggleCompletion = (task) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_COMPLETION,
      payload: { listId: task.listId, taskId: task.id },
    });
  };

  const toggleImportance = (task) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_IMPORTANCE,
      payload: { listId: task.listId, taskId: task.id },
    });
  };

  const setTaskDueDate = (task, value) => {
    dispatch({
      type: ACTION_TYPES.SET_TASK_DUE_DATE,
      payload: {
        listId: task.listId,
        taskId: task.id,
        taskDueDate: value.toDate().valueOf(),
      },
    });
  };

  const setTaskReminderTime = (task, value) => {
    dispatch({
      type: ACTION_TYPES.SET_TASK_REMINDER_TIME,
      payload: {
        listId: task.listId,
        taskId: task.id,
        taskReminderTime: value.toDate().valueOf(),
      },
    });
  };

  const handleTaskDelete = (task) => {
    dispatch({
      type: ACTION_TYPES.DELETE_TASK,
      payload: { listId: task.listId, taskId: task.id },
    });
    onClose();
  };

  return Boolean(task) ? (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "300px",
          height: "100%",
          padding: "12px",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <Checkbox
              aria-label={t("completeTask")}
              checked={task.isCompleted}
              onClick={() => toggleCompletion(task)}
            />
            <Editable
              element={
                <Typography
                  id="list-name"
                  sx={{
                    flexGrow: "1",
                    outline: "0px solid transparent",
                    color: theme.palette.text.primary,
                    userSelect: "none",
                  }}
                  variant="body2"
                >
                  {task.title}
                </Typography>
              }
              placeholder={task.title}
              onChanged={handleTitleUpdated}
            ></Editable>
            <IconButton
              edge="end"
              aria-pressed={task.isImportant}
              aria-label={t("importantTask")}
              onClick={() => toggleImportance(task)}
            >
              {task.isImportant ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
          </Box>
          <Divider />
          <OutlinedInput
            sx={{
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            size="small"
            multiline
            minRows={4}
            placeholder={t("addNotePlaceholder")}
            value={task.notes}
            onChange={handleTaskNotes}
          ></OutlinedInput>
          <Divider sx={{ marginBottom: "24px" }} />
          <TaskDatePicker
            label={t("dueDate")}
            value={task.dueDate ? moment(task.dueDate).utc(true) : null}
            onChange={(value) => setTaskDueDate(task, value)}
            fontSize="13px"
            margin="0px 0px 24px 0px"
          />
          <TaskDateTimePicker
            label={t("remindMe")}
            value={
              task.reminderTime ? moment(task.reminderTime).utc(true) : null
            }
            onChange={(value) => setTaskReminderTime(task, value)}
            disablePast
            fontSize="13px"
            margin="0px 0px 24px 0px"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            aria-label={t("dismissDetailsView")}
            size="small"
            onClick={onClose}
          >
            <ChevronRight fontSize="inherit" />
          </IconButton>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              userSelect: "none",
            }}
            variant="caption"
          >
            {task ? getTaskDate(task) : ""}
          </Typography>
          <IconButton
            edge="end"
            aria-label={t("deleteTask")}
            size="small"
            onClick={() => handleTaskDelete(task)}
          >
            <DeleteOutline fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </ClickAwayListener>
  ) : null;
}

function useSelectedTask(taskId, lists) {
  return useMemo(() => {
    for (const list of lists) {
      const task = list.items.find((item) => item.id === taskId);
      if (task) {
        return task;
      }
    }
    return null;
  }, [taskId, lists]);
}

export default TaskDetails;
