import { ChevronRightOutlined } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";

export function SubMenu({ parentMenuOpen, text, startIcon, children }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const menuItemRef = useRef(null);

  const handleMenuItemKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setSubMenuOpen(true);
    }
  };

  const handleMenuKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setSubMenuOpen(false);
    }
  };

  return (
    <>
      <MenuItem
        ref={menuItemRef}
        dense
        onClick={() => setSubMenuOpen(true)}
        onKeyDown={handleMenuItemKeyDown}
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
        onKeyDown={handleMenuKeyDown}
      >
        {children}
      </Menu>
    </>
  );
}
