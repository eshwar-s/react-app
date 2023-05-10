import { TodoSortOrder } from "./todo-settings.js";
import { uuidv4 } from "../common/uuid.js";

export class TodoItem {
  constructor(listId, title) {
    this.id = uuidv4();
    this.creationTime = new Date().toDateString();
    this.listId = listId;
    this.title = title;
    this.isImportant = false;
    this.isCompleted = false;
    this.completionTime = "";
    this.owner = null;
    this.notes = "";
  }

  static compare(item1, item2, sortOrder) {
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
