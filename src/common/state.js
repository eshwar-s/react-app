import { ACTION_TYPES } from "./actions";
import { TodoList } from "../model/todo-list.js";
import { TodoItem } from "../model/todo-item";

export const initialState = {
  loading: true,
  lists: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT_LIST:
      return { ...state, loading: false, lists: action.payload };

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
          if (list.id === action.payload.listId) {
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

    case ACTION_TYPES.TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
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
          if (list.id === action.payload.listId) {
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
        lists: state.map((list) => {
          if (list.id === action.payload.listId) {
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

    default:
      break;
  }

  return state;
};
