import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../common/context";
import { ACTION_TYPES } from "../common/actions";
import { useTranslation } from "react-i18next";

function DeleteList({ list, open, onClose }) {
  const [, dispatch] = useContext(AppContext);
  const { t } = useTranslation();

  const handleListDelete = () => {
    dispatch({
      type: ACTION_TYPES.DELETE_LIST,
      payload: { listId: list.id },
    });
    onClose();
  };

  return list !== null ? (
    <Dialog
      open={open}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogContent>
        <Box align="center">
          <img
            src={process.env.PUBLIC_URL + "/favicon.png"}
            style={{ width: "48px", height: "48px", marginBottom: "4px" }}
            alt={t("title")}
            aria-hidden
          />
          <Typography
            id="dialog-title"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {t("deleteDialogTitle", { listName: list.name })}
          </Typography>
          <Typography id="dialog-description" variant="caption">
            {t("deleteDialogDescription")}
          </Typography>
        </Box>
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
          {t("deleteDialogCancel")}
        </Button>
        <Button
          variant="contained"
          disableElevation
          size="small"
          onClick={handleListDelete}
          fullWidth={true}
          autoFocus
        >
          {t("deleteDialogConfirm")}
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}

export default DeleteList;
