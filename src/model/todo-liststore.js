import { TodoList } from "./todo-list.js";

const TODO_LIST_STORAGE_ID = "todo-lists";
const TODO_LIST_LOAD_TIMEOUT = 300;

export async function loadTodoLists() {
  return new Promise((resolve) => {
    // Using a timeout to simulate slower fetch
    setTimeout(() => {
      const todoLists = [];
      const listData = window.localStorage.getItem(TODO_LIST_STORAGE_ID);

      if (listData) {
        for (const listId of JSON.parse(listData)) {
          const itemData = window.localStorage.getItem(listId);
          todoLists.push(new TodoList().deserialize(itemData));
        }
      } else {
        todoLists.push(TodoList.new());
      }

      resolve(todoLists);
    }, TODO_LIST_LOAD_TIMEOUT);
  });
}

export function saveTodoLists(todoLists) {
  window.localStorage.setItem(
    TODO_LIST_STORAGE_ID,
    JSON.stringify(todoLists.map((list) => list.id))
  );

  for (const todoList of todoLists) {
    window.localStorage.setItem(
      todoList.id,
      Object.assign(new TodoList(), todoList).serialize()
    );
  }
}
