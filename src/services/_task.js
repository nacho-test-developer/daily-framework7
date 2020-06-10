export const createDB = () => {
  const iDB = window.indexedDB;

  if (iDB) {
    let db
    const request = iDB.open("todoList", 1);

    request.onsuccess = () => {
      db = request.result
      console.log('OPEN', db );
    };
    request.onupgradeneeded = () => {
      db = request.result;
      console.log('CREATE', db);
      const objectStore = db.createObjectStore('tasks')
    };
    request.onerror = (error) => {
      console.log("error", error);
    };
  }
};
