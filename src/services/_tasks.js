export const createTaskDB = () => {
  window.db = new PouchDB("tasks");
  let remoteCouch = false;
};

export const addTaskDB = (newTask) => {
  db.put(newTask, function callback(err, result) {
    if (err) console.warn("Error al agregar!")
  });
};

export const deleteTaskDB = (task) => {
  db.remove(task, function callback(err, result) {
    if (err) console.warn("Error al borrar!")
  });
};
