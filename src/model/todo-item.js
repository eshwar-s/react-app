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
}
