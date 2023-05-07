import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

export function IconMenuItem(props) {
  const { startIcon, text, ...other } = props;
  return (
    <MenuItem dense {...other}>
      <ListItemIcon>{startIcon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
}
