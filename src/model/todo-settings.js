import { ThemeColor } from "../common/theme";

export const TodoSortOrder = {
  ALPHABETICALLY: 0,
  IMPORTANCE: 1,
  CREATION_DATE: 2,
};

export class TodoSettings {
  constructor() {
    this.theme = ThemeColor.INDIGO;
    this.showCompleted = true;
    this.sortOrder = TodoSortOrder.ALPHABETICALLY;
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(json) {
    let serializedObj = JSON.parse(json);
    return Object.assign(this, serializedObj);
  }
}
