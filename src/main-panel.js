import { useContext } from "react";
import ListView from "./list-view";
import { AppContext } from "./context";

function MainPanel() {
  const [state] = useContext(AppContext);

  return state.selectedList < state.lists.length ? (
    <ListView list={state.lists[state.selectedList]}></ListView>
  ) : null;
}

export default MainPanel;
