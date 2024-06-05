import { updateTree, updateTreeDirectoryFlatten } from "../../store/treeSlice";
import { ChangeActionIfItemExistInCreateAction } from "../common";

const handleRename = (name, fileTarget, tree, dispatch) => {
  const fileTargetPath = fileTarget.path;
  ChangeActionIfItemExistInCreateAction(name, fileTargetPath);
  const parentPath = fileTargetPath.split("/").slice(0, -1).join("/");

  var treeClone = tree.slice(0);

  const treeDirectoryRenameItem = (tree) =>
    tree.map((item) => {
      const itemCloned = { ...item };

      if (itemCloned.path === fileTargetPath) {
        itemCloned.name = name;
        itemCloned.path = parentPath ? parentPath + "/" + name : name;
        return itemCloned;
      }

      if (itemCloned.children && itemCloned.children.length > 0) {
        itemCloned.children = treeDirectoryRenameItem(itemCloned.children);
      }

      return itemCloned;
    });
  dispatch(updateTree(treeDirectonsoloryRenameItem(treeClone)));
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
};

export default handleRename;
