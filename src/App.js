import { useEffect, useMemo, useReducer } from "react";
import { loadTodoLists } from "./model/todo-liststore.js";
import Sidebar from "./sidebar.js";
import Spinner from "./spinner.js";
import { ACTION_TYPES } from "./actions.js";
import { initialState, reducer } from "./state.js";
import { Box, ThemeProvider } from "@mui/material";
import { AppContext } from "./context";
import ListView from "./list-view.js";
import getTheme from "./theme.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useMemo(() => getTheme(), []);

  useEffect(() => {
    loadTodoLists()
      .then((lists) =>
        dispatch({ type: ACTION_TYPES.INIT_LIST, payload: lists })
      )
      .catch((error) => alert(`Failed to load lists: ${error.message}`));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={[state, dispatch]}>
        <Spinner loading={state.loading}>
          <Box id="container" sx={{ display: "flex", height: "100%" }}>
            <Box
              id="navigation"
              sx={{
                width: "300px",
                height: "100%",
              }}
            >
              <Sidebar></Sidebar>
            </Box>
            <Box id="main" sx={{ height: "100%", flexGrow: "1" }}>
              <ListView></ListView>
            </Box>
          </Box>
        </Spinner>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
