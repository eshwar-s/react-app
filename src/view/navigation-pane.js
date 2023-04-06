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
import { useContext, useMemo, useState } from "react";
import { ACTION_TYPES } from "../common/actions";
import { AppContext } from "../common/context";
import { Link } from "react-router-dom";
import { InitialRouteIndex, RouteEntriesIndex } from "../common/routes";

function NavigationContextMenu({ selectedList, anchorPosition, onClose }) {
  const [state, dispatch] = useContext(AppContext);

  const handleListDelete = () => {
    dispatch({
      type: ACTION_TYPES.DELETE_LIST,
      payload: { listId: selectedList },
    });
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
      <MenuItem dense disabled={selectedList === null}>
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
        disabled={state.lists.length <= 1 || selectedList === null}
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
  const [state] = useContext(AppContext);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(InitialRouteIndex);

  const selectedList = useMemo(() => {
    const listIndex = selectedIndex - RouteEntriesIndex.LISTS;
    return listIndex >= 0 && listIndex < state.lists.length
      ? state.lists[listIndex].id
      : null;
  }, [selectedIndex, state.lists]);

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
    <nav onContextMenu={handleContextMenu}>
      <List>
        {state.lists.map((list, index) => {
          const badgeCount = list.items.filter(
            (item) => !item.isCompleted
          ).length;
          return (
            <ListItem key={list.id} dense disablePadding>
              <ListItemButton
                component={Link}
                to={`/lists/${index}`}
                selected={selectedIndex === index + RouteEntriesIndex.LISTS}
                onClick={() =>
                  setSelectedIndex(index + RouteEntriesIndex.LISTS)
                }
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
        selectedList={selectedList}
        anchorPosition={contextMenu}
        onClose={() => setContextMenu(null)}
      ></NavigationContextMenu>
    </nav>
  );
}

export default NavigationPane;
