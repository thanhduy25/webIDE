import {
  convertFlattenToNestedTreeDirectory,
  updateTreeDirectoryFlatten,
} from "../../store/treeSlice";
import { isItemExistedTreeDirectory } from "../common";
import { ChangeActionIfItemExistInCreateAction } from "../common";

const handleRename = (name, fileTarget, treeFlatten, dispatch) => {
  const fileTargetPath = fileTarget.path;

  ChangeActionIfItemExistInCreateAction(name, fileTargetPath);
  const parentPath = fileTargetPath.split("/").slice(0, -1).join("/");

  const newPath = parentPath ? parentPath + "/" + name : name;
  if (isItemExistedTreeDirectory(treeFlatten, newPath)) {
    return false;
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
};

export default handleRename;
