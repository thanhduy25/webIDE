import {
  convertFlattenToNestedTreeDirectory,
  updateTreeDirectoryFlatten,
} from "../../store/treeSlice";
import { ChangeActionIfItemExistInCreateAction } from "../common";

const handleRename = (name, fileTarget, dispatch) => {
  const fileTargetPath = fileTarget.path;
  ChangeActionIfItemExistInCreateAction(name, fileTargetPath);
  const parentPath = fileTargetPath.split("/").slice(0, -1).join("/");

  dispatch(
    updateTreeDirectoryFlatten({
      action: "rename",
      item: {
        old: {
          path: fileTargetPath,
        },
        new: {
          name: name,
          path: parentPath ? parentPath + "/" + name : name,
        },
      },
    })
  );

  dispatch(convertFlattenToNestedTreeDirectory());
};

export default handleRename;
