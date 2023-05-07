import { uuidv4 } from "../common/uuid.js";

export const DEFAULT_TODO_LIST_NAME = "Untitled";

export class TodoList {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.items = [];
  }

  static new() {
    return new TodoList(DEFAULT_TODO_LIST_NAME);
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
