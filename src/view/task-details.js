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
import { useContext } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import Editable from "./editable";
import { useTranslation } from "react-i18next";

function TaskDetails({ task, onClose }) {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const { t } = useTranslation();

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
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
            size="small"
            multiline
            minRows={3}
            placeholder={t("addNotePlaceholder")}
            value={task.notes}
            onChange={handleTaskNotes}
          ></OutlinedInput>
          <Divider />
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
            {t("createdDate", { date: task.creationTime })}
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

export default TaskDetails;
