import { useTheme } from "@emotion/react";
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
} from "@mui/material";
import { useContext, useMemo } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import Editable from "./editable";
import { useTranslation } from "react-i18next";

function TaskDetails({ list, taskId, onClose }) {
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const { t } = useTranslation();

  const task = useMemo(() => {
    return taskId ? list.items.find((task) => task.id === taskId) : null;
  }, [list.items, taskId]);

  const handleTitleUpdated = (taskTitle) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK_TITLE,
      payload: { listId: list.id, taskId: taskId, taskTitle: taskTitle },
    });
  };

  const handleTaskNotes = (event) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK_NOTES,
      payload: {
        listId: list.id,
        taskId: taskId,
        taskNotes: event.target.value,
      },
    });
  };

  const toggleCompletion = (taskId) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_COMPLETION,
      payload: { listId: list.id, taskId: taskId },
    });
  };

  const toggleImportance = (taskId) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_TASK_IMPORTANCE,
      payload: { listId: list.id, taskId: taskId },
    });
  };

  const handleTaskDelete = () => {
    dispatch({
      type: ACTION_TYPES.DELETE_TASK,
      payload: { listId: list.id, taskId: taskId },
    });
    onClose();
  };

  return Boolean(task) ? (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          height: "100vh",
          padding: "12px",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}
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
              onClick={() => toggleCompletion(task.id)}
            />
            <Editable
              element={
                <Typography
                  sx={{
                    flex: "1 0 auto",
                    outline: "0px solid transparent",
                    color: theme.palette.text.primary,
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
              onClick={() => toggleImportance(task.id)}
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
            sx={{ color: theme.palette.text.primary }}
            variant="caption"
          >
            {t("createdDate", { date: task.creationTime })}
          </Typography>
          <IconButton
            edge="end"
            aria-label={t("deleteList")}
            size="small"
            onClick={handleTaskDelete}
          >
            <DeleteOutline fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </ClickAwayListener>
  ) : null;
}

export default TaskDetails;
