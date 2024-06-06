const getFilesInCreateAction = () => {
  const listActions = localStorage.actions
    ? JSON.parse(localStorage.actions)
    : [];

  const createAction = listActions.filter(
    (action) => action.action === "create"
  );

  return createAction.map((action) => action.file_path);
};

export default getFilesInCreateAction;
