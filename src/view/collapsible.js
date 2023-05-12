import { Button, Collapse, useTheme } from "@mui/material";
import { useState } from "react";
import { getTextColor } from "../common/colors";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function Collapsible({ label, size, children }) {
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Button
        sx={{ color: getTextColor(theme) }}
        size={size}
        onClick={() => setCollapse(!collapse)}
        startIcon={collapse ? <ExpandLess /> : <ExpandMore />}
      >
        {label}
      </Button>
      <Collapse in={!collapse}>{children}</Collapse>
    </>
  );
}

export default Collapsible;
