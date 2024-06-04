import { updateTree } from "../../store/treeSlice";
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
  dispatch(updateTree(treeDirectoryRenameItem(treeClone)));
};

export default handleRename;
