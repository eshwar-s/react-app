import { TodoSortOrder } from "./todo-settings.js";
import { uuidv4 } from "./uuid.js";

export class TodoItem {
  constructor(title) {
    this.id = uuidv4();
    this.creationTime = new Date().toDateString();
    this.title = title;
    this.isImportant = false;
    this.isCompleted = false;
    this.owner = null;
    this.notes = "";
  }

  static sort(item1, item2, sortOrder) {
    switch (sortOrder) {
      case TodoSortOrder.ALPHABETICAL:
        return item1.title.localeCompare(item2.title);

      case TodoSortOrder.IMPORTANCE:
        return item2.isImportant - item1.isImportant;

      case TodoSortOrder.CREATION_DATE:
      default:
        return Date.parse(item1.creationTime) - Date.parse(item2.creationTime);
    }
  }
}
