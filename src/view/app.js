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
import { useDisableContextMenu } from "../common/hooks.js";
import { GetThemeColor } from "../common/colors.js";
import { useLocation } from "react-router-dom";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pathname } = useLocation();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useTheme(isDarkMode, GetThemeColor(pathname, state.settings));

  useDisableContextMenu();

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
              sx={{
                height: "100%",
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              <Sidebar sx={{ flexShrink: "0" }} />
            </Box>
            <Box sx={{ height: "100%", flexGrow: "1", overflow: "hidden" }}>
              <MainPanel />
            </Box>
          </Box>
        </Spinner>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
