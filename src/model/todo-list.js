import { uuidv4 } from "../common/uuid.js";

export const DEFAULT_TODO_LIST_NAME = "Untitled";
export const TASKS_LIST_NAME = "Tasks";
export const FLAGGED_LIST_NAME = "Flagged";
export const BUILTIN_LISTS_COUNT = 2;

export class TodoList {
  constructor(name = DEFAULT_TODO_LIST_NAME) {
    this.id = uuidv4();
    this.name = name;
    this.builtIn = name !== DEFAULT_TODO_LIST_NAME;
    this.items = [];
  }

  static createTodoLists() {
    return [
      new TodoList(TASKS_LIST_NAME),
      new TodoList(FLAGGED_LIST_NAME),
      new TodoList(DEFAULT_TODO_LIST_NAME),
    ];
  }

  printTodoList() {
    console.log(`listName: ${this.name}`);
    this.items.forEach((value) => console.log(value));
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(json) {
    let serializedObj = JSON.parse(json);
    return Object.assign(this, serializedObj);
  }
}
