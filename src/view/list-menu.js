import {
  CheckCircleOutline,
  DeleteOutline,
  FlipOutlined,
  MoreHoriz,
  PaletteOutlined,
  PrintOutlined,
  SortOutlined,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getTextColor } from "./list-view";

function ListMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  return (
    <>
      <Button
        id="list-menu-button"
        sx={{ color: getTextColor(theme) }}
        disableElevation
        size="small"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreHoriz />
      </Button>
      <Menu
        id="list-menu"
        MenuListProps={{
          "aria-labelledby": "list-menu-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        elevation={0}
      >
        <MenuItem dense onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <FlipOutlined />
          </ListItemIcon>
          <ListItemText>{t("renameList")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <SortOutlined />
          </ListItemIcon>
          <ListItemText>{t("sortList")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <PaletteOutlined />
          </ListItemIcon>
          <ListItemText>{t("changeTheme")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <PrintOutlined />
          </ListItemIcon>
          <ListItemText>{t("printList")}</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>
          <ListItemText>{t("hideCompletedTasks")}</ListItemText>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem dense onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <DeleteOutline />
          </ListItemIcon>
          <ListItemText>{t("deleteList")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ListMenu;
