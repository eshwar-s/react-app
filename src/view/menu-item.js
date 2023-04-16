import { ChevronRightOutlined } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";

export function StyledMenuItem(props) {
  const { startIcon, text, ...other } = props;
  return (
    <MenuItem dense {...other}>
      <ListItemIcon>{startIcon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
}

export function SubMenuItem({ text, startIcon, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <MenuItem ref={ref} dense onClick={() => setMenuOpen(true)}>
        <ListItemIcon>{startIcon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
        <ListItemIcon sx={{ justifyContent: "right" }}>
          <ChevronRightOutlined />
        </ListItemIcon>
      </MenuItem>
      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        anchorEl={ref.current}
        elevation={1}
        onClose={() => setMenuOpen(false)}
      >
        {children}
      </Menu>
    </>
  );
}
