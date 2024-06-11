import {
  convertFlattenToNestedTreeDirectory,
  updateTreeDirectoryFlatten,
} from "../../store/treeSlice";
import { isItemExistedTreeDirectory } from "../common";
import {
  createMoveAction,
  createDeleteAction,
  addAction,
} from "../actionStorage";
import { getFilesInCreateAction } from "../actionStorage";
import { get } from "lodash";

const handleRename = (name, fileTarget, treeFlatten, dispatch) => {
  const fileTargetPath = fileTarget.path;

  const parentPath = fileTargetPath.split("/").slice(0, -1).join("/");

  const newPath = parentPath ? parentPath + "/" + name : name;

  if (isItemExistedTreeDirectory(treeFlatten, newPath)) {
    return true;
  }

  dispatch(
    updateTreeDirectoryFlatten({
      action: "rename",
      item: {
        old: {
          path: fileTargetPath,
        },
        new: {
          name: name,
          path: newPath,
        },
      },
    })
  );

  dispatch(convertFlattenToNestedTreeDirectory());

  let newListActions = [];

  let listActions = localStorage.actions
    ? JSON.parse(localStorage.actions)
    : [];

  if (getFilesInCreateAction().includes(fileTargetPath)) {
    newListActions = listActions.map((action) => {
      if (action.action === "create" && action.file_path === fileTargetPath) {
        return {
          ...action,
          file_path: newPath,
        };
      }
      return action;
    });
  } else {
    const currentMoveAction = createMoveAction(fileTargetPath, newPath);

    let indexRemoveIfDuplicate = null;
    let hasChanged = true;

    listActions.forEach((action, index) => {
      if (action.action === "move") {
        if (currentMoveAction.previous_path === action.file_path) {
          if (currentMoveAction.file_path === action.previous_path) {
            indexRemoveIfDuplicate = index;
            return;
          } else {
            hasChanged = false;
            action.file_path = currentMoveAction.file_path;
          }
        }
      }
    });

    if (hasChanged) {
      if (indexRemoveIfDuplicate !== null) {
        listActions.splice(indexRemoveIfDuplicate, 1);
      } else {
        listActions = listActions.filter((action) => {
          return !(
            action.action === "update" && action.file_path === fileTargetPath
          );
        });

        listActions.push(
          createMoveAction(
            fileTargetPath,
            newPath,
            treeFlatten[fileTargetPath].content
          )
        );
      }
    }

    newListActions = listActions;
  }

  localStorage.actions = JSON.stringify(newListActions);

  return false;
};

export default handleRename;
