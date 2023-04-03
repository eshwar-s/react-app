import { List as ListIcon } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ACTION_TYPES } from "./actions";
import { AppContext } from "./context";

function TodoLists() {
  const [state, dispatch] = useContext(AppContext);

  const handleListChange = (list) => {
    dispatch({ type: ACTION_TYPES.SELECT_LIST, payload: { listId: list.id } });
  };

  const getBadgeCount = (list) => {
    return list.items.filter((item) => !item.isCompleted).length;
  };

  return (
    <List>
      {state.lists.map((list, index) => {
        const badgeCount = getBadgeCount(list);
        return (
          <ListItem key={list.id} dense disablePadding>
            <ListItemButton
              selected={state.selectedList === index}
              onClick={() => handleListChange(list)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText>{list.name}</ListItemText>
              {badgeCount > 0 ? (
                <Typography variant="caption">{badgeCount}</Typography>
              ) : null}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default TodoLists;
