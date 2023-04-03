import { InputAdornment, OutlinedInput } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useContext, useState } from "react";
import { AppContext } from "./context";
import { ACTION_TYPES } from "./actions";

function AddTask() {
  const [value, setValue] = useState("");
  const [, dispatch] = useContext(AppContext);
  const theme = useTheme();

  const handleKeydown = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      dispatch({
        type: ACTION_TYPES.ADD_TASK,
        payload: {
          taskTitle: event.target.value,
        },
      });
      setValue("");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <OutlinedInput
      sx={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        input: {
          color: theme.palette.background.paper,
          "&::placeholder": { opacity: 1 },
        },
      }}
      size="small"
      placeholder="Add a Task"
      startAdornment={
        <InputAdornment position="start">
          <AddIcon sx={{ color: theme.palette.background.paper }} />
        </InputAdornment>
      }
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeydown}
    ></OutlinedInput>
  );
}

export default AddTask;
