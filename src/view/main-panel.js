import SelectedListView from "./list-view";
import { Route, Routes } from "react-router-dom";

function MainPanel() {
  return (
    <Routes>
      <Route path="/lists/:selectedIndex" element={<SelectedListView />} />
    </Routes>
  );
}

export default MainPanel;
