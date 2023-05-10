import { ACTION_TYPES } from "./actions";
import { TodoList } from "../model/todo-list.js";
import { TodoItem } from "../model/todo-item";
import { TodoSettings } from "../model/todo-settings";

export const initialState = {
  loading: true,
  lists: [],
  settings: new TodoSettings(),
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT_LIST:
      return {
        ...state,
        loading: false,
        lists: action.payload.lists,
        settings: action.payload.settings,
      };

    case ACTION_TYPES.ADD_LIST:
      const newList = TodoList.new();
      return {
        ...state,
        lists: state.lists.concat(newList),
      };

    case ACTION_TYPES.RENAME_LIST:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return { ...list, name: action.payload.listName };
          }
          return list;
        }),
      };

    case ACTION_TYPES.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => {
          return list.id !== action.payload.listId;
        }),
      };

    case ACTION_TYPES.ADD_TASK:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            const newTask = new TodoItem(action.payload.taskTitle);
            return {
              ...list,
              items: list.items.concat(newTask),
            };
          }
          return list;
        }),
      };

    case ACTION_TYPES.UPDATE_TASK_TITLE:
      return {
        ...state,
        lists: state.lists.map((list) => {
          const index = list.items.findIndex(
            (item) => item.id == action.payload.taskId
          );
          if (index !== -1) {
            return {
              ...list,
              items: list.items.map((task) => {
                if (task.id === action.payload.taskId) {
                  return {
                    ...task,
                    title: action.payload.taskTitle,
                  };
                }
                return task;
              }),
            };
          }
          return list;
        }),
      };

    case ACTION_TYPES.UPDATE_TASK_NOTES:
      return {
        ...state,
        lists: state.lists.map((list) => {
          const index = list.items.findIndex(
            (item) => item.id == action.payload.taskId
          );
          if (index !== -1) {
            return {
              ...list,
              items: list.items.map((task) => {
                if (task.id === action.payload.taskId) {
                  return {
                    ...task,
                    notes: action.payload.taskNotes,
                  };
                }
                return task;
              }),
            };
          }
          return list;
        }),
      };

    case ACTION_TYPES.TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        lists: state.lists.map((list) => {
          const index = list.items.findIndex(
            (item) => item.id == action.payload.taskId
          );
          if (index !== -1) {
            return {
              ...list,
              items: list.items.map((task) => {
                if (task.id === action.payload.taskId) {
                  return {
                    ...task,
                    isCompleted: !task.isCompleted,
                  };
                }
                return task;
              }),
            };
          }
          return list;
        }),
      };

    case ACTION_TYPES.TOGGLE_TASK_IMPORTANCE:
      return {
        ...state,
        lists: state.lists.map((list) => {
          const index = list.items.findIndex(
            (item) => item.id == action.payload.taskId
          );
          if (index !== -1) {
            return {
              ...list,
              items: list.items.map((task) => {
                if (task.id === action.payload.taskId) {
                  return {
                    ...task,
                    isImportant: !task.isImportant,
                  };
                }
                return task;
              }),
            };
          }
          return list;
        }),
      };

    case ACTION_TYPES.DELETE_TASK:
      return {
        ...state,
        lists: state.lists.map((list) => {
          const index = list.items.findIndex(
            (item) => item.id == action.payload.taskId
          );
          if (index !== -1) {
            return {
              ...list,
              items: list.items.filter((item) => {
                return item.id !== action.payload.taskId;
              }),
            };
          }
          return list;
        }),
      };

    case ACTION_TYPES.SET_THEME_COLOR:
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload,
        },
      };

    case ACTION_TYPES.SET_TASK_SORT_ORDER:
      return {
        ...state,
        settings: {
          ...state.settings,
          sortOrder: action.payload,
        },
      };

    case ACTION_TYPES.TOGGLE_SHOW_COMPLETED_TASKS:
      return {
        ...state,
        settings: {
          ...state.settings,
          showCompleted: !state.settings.showCompleted,
        },
      };

    default:
      break;
  }

  return state;
};
