export class Task {
  constructor(item = {}) {
    this._id = new Date().toISOString();
    this.title = item.title;
    this.category = item.category;
    this.created = new Date();
    this.done = false;
  }

  task() {
    return this
  }
}