import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useCallback, useContext, useState } from "react";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { useTranslation } from "react-i18next";
import { CheckCircle, Circle } from "@mui/icons-material";
import { ThemeColor, getPrimaryColor } from "../common/colors";

function ThemeCheckbox({ themeColor, checked, onChecked }) {
  const handleSelectionChange = (event) => {
    if (event.target.checked) {
      onChecked(themeColor);
    }
  };

  const style = {
    width: "48px",
    height: "48px",
    color: getPrimaryColor(themeColor).main,
  };

  const label = { inputProps: { "aria-label": themeColor } };

  return (
    <Checkbox
      checked={checked}
      {...label}
      onChange={handleSelectionChange}
      icon={<Circle sx={style} />}
      checkedIcon={<CheckCircle sx={style} />}
      value={themeColor}
    />
  );
}

function ThemePicker({ open, onClose }) {
  const [state, dispatch] = useContext(AppContext);
  const [themeSelection, setThemeSelection] = useState(state.settings.theme);
  const { t } = useTranslation();

  const handleThemeChange = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.SET_THEME_COLOR,
      payload: themeSelection,
    });
    onClose();
  }, [themeSelection, dispatch, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle
        id="dialog-title"
        variant="subtitle1"
        sx={{ fontWeight: "bold" }}
      >
        {t("themeDialogTitle")}
      </DialogTitle>
      <DialogContent>
        {Object.values(ThemeColor).map((themeColor, index) => {
          return (
            <Fragment key={index}>
              <ThemeCheckbox
                themeColor={themeColor}
                checked={themeSelection === themeColor}
                onChecked={setThemeSelection}
              />
            </Fragment>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          size="small"
          onClick={onClose}
          color="secondary"
          fullWidth={true}
        >
          {t("themeDialogCancel")}
        </Button>
        <Button
          variant="contained"
          disableElevation
          size="small"
          onClick={handleThemeChange}
          fullWidth={true}
          autoFocus
        >
          {t("themeDialogConfirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ThemePicker;
