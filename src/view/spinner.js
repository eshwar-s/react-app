import { CircularProgress } from "@mui/material";

function Spinner({ children, loading }) {
  return loading ? (
    <CircularProgress
      color="primary"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    ></CircularProgress>
  ) : (
    children
  );
}

export default Spinner;
