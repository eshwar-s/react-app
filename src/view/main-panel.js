import SelectedListView from "./list-view";
import { Route, Routes } from "react-router-dom";

function MainPanel() {
  return (
    <Routes>
      <Route
        path="/lists/:selectedIndex"
        element={<SelectedListView />}
      ></Route>
    </Routes>
  );
}

export default MainPanel;
