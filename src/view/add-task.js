import { InputAdornment, OutlinedInput } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { useContext, useState } from "react";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { useTranslation } from "react-i18next";
import { getTextColor } from "../common/colors";

function AddTask({ listId, setImportant, setDueDate }) {
  const [value, setValue] = useState("");
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      dispatch({
        type: ACTION_TYPES.ADD_TASK,
        payload: {
          listId: listId,
          taskTitle: event.target.value,
          taskImportance: setImportant,
          taskDueDate: setDueDate ? Date.now() : null,
        },
      });
      setValue("");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <AddTextInput
      size="small"
      placeholder={t("addTaskPlaceholder")}
      startAdornment={
        <InputAdornment position="start">
          <AddIcon sx={{ color: getTextColor(theme) }} />
        </InputAdornment>
      }
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

const AddTextInput = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.15)",
  input: {
    color: getTextColor(theme),
    "&::placeholder": { opacity: 1 },
    spellCheck: false,
  },
  "@media print": {
    display: "none",
  },
}));

export default AddTask;
