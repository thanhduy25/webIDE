const createCreateAction = (filePath, content) => {
  return {
    action: "create",
    file_path: filePath,
    content: content,
  };
};

const createUpdateAction = (filePath, content) => {
  return {
    action: "update",
    file_path: filePath,
    content: content,
  };
};

const createDeleteAction = (filePath) => {
  return {
    action: "delete",
    file_path: filePath,
  };
};

const addAction = (action) => {
  if (!localStorage.actions) {
    localStorage.setItem("actions", JSON.stringify([]));
  }

  const actions = JSON.parse(localStorage.actions);
  actions.push(action);

  localStorage.actions = JSON.stringify(actions);
};

export {
  createCreateAction,
  createUpdateAction,
  createDeleteAction,
  addAction,
};
