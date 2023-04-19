import { ChevronRightOutlined } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";

export function IconMenuItem(props) {
  const { startIcon, text, ...other } = props;
  return (
    <MenuItem dense {...other}>
      <ListItemIcon>{startIcon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
}

export function SubMenu({ text, startIcon, parentMenuOpen, children }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const menuItemRef = useRef(null);

  return (
    <>
      <MenuItem
        ref={menuItemRef}
        dense
        onClick={() => setSubMenuOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            setSubMenuOpen(true);
          }
        }}
      >
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
        open={parentMenuOpen && subMenuOpen}
        anchorEl={menuItemRef.current}
        onClose={() => setSubMenuOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            setSubMenuOpen(false);
          }
        }}
      >
        {children}
      </Menu>
    </>
  );
}
