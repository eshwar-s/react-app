import {
  DeleteOutlined,
  FlipOutlined,
  List as ListIcon,
  PrintOutlined,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";

function NavigationContextMenu({ anchorPosition, onClose }) {
  const [state, dispatch] = useContext(AppContext);

  const handleListDelete = () => {
    if (state.selectedList < state.lists.length) {
      dispatch({
        type: ACTION_TYPES.DELETE_LIST,
        payload: { listId: state.lists[state.selectedList].id },
      });
    }
    onClose();
  };

  return (
    <Menu
      open={anchorPosition != null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        anchorPosition !== null
          ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
          : undefined
      }
    >
      <MenuItem dense>
        <ListItemIcon>
          <FlipOutlined />
        </ListItemIcon>
        <ListItemText>Rename List</ListItemText>
      </MenuItem>
      <MenuItem dense>
        <ListItemIcon>
          <PrintOutlined />
        </ListItemIcon>
        <ListItemText>Print List</ListItemText>
      </MenuItem>
      <Divider></Divider>
      <MenuItem
        onClick={handleListDelete}
        dense
        disabled={state.lists.length <= 1}
      >
        <ListItemIcon>
          <DeleteOutlined />
        </ListItemIcon>
        <ListItemText>Delete List</ListItemText>
      </MenuItem>
    </Menu>
  );
}

function NavigationPane() {
  const [state, dispatch] = useContext(AppContext);
  const [contextMenu, setContextMenu] = useState(null);

  const handleListChange = (list) => {
    dispatch({ type: ACTION_TYPES.SELECT_LIST, payload: { listId: list.id } });
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.target.click();
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX, mouseY: event.clientY }
        : null
    );
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <List>
        {state.lists.map((list, index) => {
          const badgeCount = list.items.filter(
            (item) => !item.isCompleted
          ).length;
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
      <NavigationContextMenu
        anchorPosition={contextMenu}
        onClose={() => setContextMenu(null)}
      ></NavigationContextMenu>
    </div>
  );
}

export default NavigationPane;
