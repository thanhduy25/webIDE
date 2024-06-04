import { updateTree } from "../../store/treeSlice";
import { createCreateAction, addAction } from "../actionStorage";
import { isItemAddedInTreeDirectory } from "../common";

const handleAdd = (name, type, fileTarget, tree, dispatch) => {
  const fileTargetPath = fileTarget.path;
  const newPath = fileTargetPath + "/" + name;

  if (isItemAddedInTreeDirectory(tree, newPath, type)) {
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

  var treeClone = tree.slice(0);

  const treeDirectoryAddedItem = (tree) =>
    tree.map((item) => {
      const itemCloned = { ...item };

      if (itemCloned.type === "tree") {
        if (itemCloned.path === fileTargetPath) {
          itemCloned.children = [...itemCloned.children, newItem];
          return itemCloned;
        }

        if (itemCloned.children && itemCloned.children.length > 0) {
          itemCloned.children = treeDirectoryAddedItem(itemCloned.children);
        }
      }

      return itemCloned;
    });

  if (type === "blob") {
    const action = createCreateAction(newItem.path, "");
    addAction(action);
  }

  dispatch(updateTree(treeDirectoryAddedItem(treeClone)));
};

export default handleAdd;
