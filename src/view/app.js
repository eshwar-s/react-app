import { useCallback, useEffect, useMemo, useReducer } from "react";
import { loadTodoLists, saveTodoLists } from "../model/todo-liststore.js";
import Sidebar from "./sidebar";
import Spinner from "./spinner";
import { ACTION_TYPES } from "../common/actions.js";
import { initialState, reducer } from "../common/state.js";
import { Box, ThemeProvider, useMediaQuery } from "@mui/material";
import { AppContext } from "../common/context.js";
import getTheme from "../common/theme";
import MainPanel from "./main-panel";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  const showSidebar = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(
    useCallback(() => {
      if (!state.loading) {
        saveTodoLists(state.lists);
      }
    }, [state.loading, state.lists])
  );

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
                width: "250px",
                height: "100%",
                display: showSidebar ? "block" : "none",
              }}
            >
              <Sidebar></Sidebar>
            </Box>
            <Box role="main" id="main" sx={{ height: "100%", flexGrow: "1" }}>
              <MainPanel></MainPanel>
            </Box>
          </Box>
        </Spinner>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
