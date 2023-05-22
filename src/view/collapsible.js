import { Button, Collapse, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { getTextColor } from "../common/colors";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function Collapsible({ label, size, children }) {
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();
  const isPrinting = useMediaQuery("print");

  return !isPrinting ? (
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
  ) : (
    <>{children}</>
  );
}

export default Collapsible;
