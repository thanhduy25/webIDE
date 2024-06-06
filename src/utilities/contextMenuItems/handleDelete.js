import {
  convertFlattenToNestedTreeDirectory,
  updateTreeDirectoryFlatten,
} from "../../store/treeSlice";

import { createDeleteAction, addAction } from "../actionStorage";

const handleDelete = (fileTarget, dispatch) => {
  const fileTargetPath = fileTarget.path;

  dispatch(
    updateTreeDirectoryFlatten({
      action: "delete",
      item: fileTargetPath,
    })
  );

  dispatch(convertFlattenToNestedTreeDirectory());

  const actionsList = localStorage.actions
    ? JSON.parse(localStorage.actions)
    : [];

  let indexIfFileCreatedAfter = null;

  actionsList.forEach((action, index) => {
    if (action.action === "create" && action.file_path === fileTargetPath) {
      indexIfFileCreatedAfter = index;
      return;
    }
  });

  if (indexIfFileCreatedAfter !== null) {
    actionsList.splice(indexIfFileCreatedAfter, 1);
    localStorage.actions = JSON.stringify(actionsList);
  } else {
    const deleteAction = createDeleteAction(fileTargetPath);
    addAction(deleteAction);
  }
};

export default handleDelete;
