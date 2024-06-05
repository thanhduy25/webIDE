import {
  convertFlattenToNestedTreeDirectory,
  updateTreeDirectoryFlatten,
} from "../../store/treeSlice";

const handleDelete = (fileTarget, dispatch) => {
  const fileTargetPath = fileTarget.path;

  dispatch(
    updateTreeDirectoryFlatten({
      action: "delete",
      item: fileTargetPath,
    })
  );

  dispatch(convertFlattenToNestedTreeDirectory());
};

export default handleDelete;
