import { ROUTE } from "../common/routes";
import SelectedListView from "./list-view";
import { Route, Routes } from "react-router-dom";
import MyDayView from "./myday-view";
import ImportantView from "./important-view";
import PlannedView from "./planned-view";
import FlaggedView from "./flagged-view";
import TasksView from "./tasks-view";
import SearchView from "./search-view";

function MainPanel() {
  return (
    <Routes>
      <Route path={ROUTE.SEARCH} element={<SearchView />} />
      <Route path={ROUTE.MY_DAY} element={<MyDayView />} />
      <Route path={ROUTE.IMPORTANT} element={<ImportantView />} />
      <Route path={ROUTE.PLANNED} element={<PlannedView />} />
      <Route path={ROUTE.FLAGGED} element={<FlaggedView />} />
      <Route path={ROUTE.TASKS} element={<TasksView />} />
      <Route
        path={`${ROUTE.LISTS}/:selectedIndex`}
        element={<SelectedListView />}
      />
    </Routes>
  );
}

export default MainPanel;
