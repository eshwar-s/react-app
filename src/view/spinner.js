import { CircularProgress } from "@mui/material";

function Spinner({ children, loading }) {
  return loading ? <CircularProgress></CircularProgress> : children;
}

export default Spinner;
