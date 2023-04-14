import { useEffect, useReducer } from "react";
import {
  loadTodoLists,
  saveTodoLists,
  saveTodoSettings,
} from "../model/todo-store.js";
import Sidebar from "./sidebar";
import Spinner from "./spinner";
import { ACTION_TYPES } from "../common/actions.js";
import { initialState, reducer } from "../common/state.js";
import { Box, ThemeProvider, useMediaQuery } from "@mui/material";
import { AppContext } from "../common/context.js";
import useTheme from "../common/theme";
import MainPanel from "./main-panel";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useTheme(darkMode, state.settings.theme);
  const showSidebar = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    loadTodoLists()
      .then(({ lists, settings }) => {
        dispatch({
          type: ACTION_TYPES.INIT_LIST,
          payload: { lists: lists, settings: settings },
        });
      })
      .catch((error) => alert(`Failed to load lists: ${error.message}`));
  }, []);

  useEffect(() => {
    if (!state.loading) {
      saveTodoLists(state.lists);
    }
  }, [state.loading, state.lists]);

  useEffect(() => {
    if (!state.loading) {
      saveTodoSettings(state.settings);
    }
  }, [state.loading, state.settings]);

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
