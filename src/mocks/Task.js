export class Task {
  constructor(title, category) {
    this._id = new Date().toISOString();
    this.title = title;
    this.category = category;
    this.created = new Date();
    this.done = false;
  }
}