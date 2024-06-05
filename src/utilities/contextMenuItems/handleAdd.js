import {
  convertFlattenToNestedTreeDirectory,
  updateTreeDirectoryFlatten,
} from "../../store/treeSlice";
import { createCreateAction, addAction } from "../actionStorage";
import { isItemExistedTreeDirectory } from "../common";

const handleAdd = (name, type, fileTarget, treeFlatten, dispatch) => {
  let fileTargetPath = "";
  if (fileTarget != "root") {
    fileTargetPath = fileTarget.path;
  }
  let newPath = fileTargetPath + "/" + name;
  if (newPath[0] === "/") {
    newPath = newPath.slice(1);
  }

  if (isItemExistedTreeDirectory(treeFlatten, newPath)) {
    return;
  }

  let newItem = {
    id: null,
    name,
    path: newPath,
    type,
  };

  if (type === "tree") {
    newItem.children = [];
  }

  dispatch(
    updateTreeDirectoryFlatten({
      action: "add",
      item: {
        [newItem.path]: newItem,
      },
    })
  );

  dispatch(convertFlattenToNestedTreeDirectory());

  if (type === "blob") {
    const action = createCreateAction(
      newItem.path === undefined ? "" : newItem.path,
      ""
    );
    addAction(action);
  }
};

export default handleAdd;
