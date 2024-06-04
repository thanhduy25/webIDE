import { updateTree } from "../../store/treeSlice";

const handleDelete = (fileTarget, tree, dispatch) => {
  const fileTargetPath = fileTarget.path;
  const treeDirectoryDeleteItem = (tree) => {
    const treeClone = [...tree];

    const treeCloneModified = treeClone.map((item) => {
      const itemCloned = { ...item };

      if (itemCloned.children && itemCloned.children.length > 0) {
        const numChilrenAfterFilter = itemCloned.children.filter(
          (i) => i.path !== fileTargetPath
        ).length;
        if (itemCloned.children.length > numChilrenAfterFilter) {
          const childClone = itemCloned.children.slice();
          itemCloned.children = childClone.filter(
            (i) => i.path !== fileTargetPath
          );
          return itemCloned;
        }
        itemCloned.children = [...treeDirectoryDeleteItem(itemCloned.children)];
      }
      if (itemCloned.path === fileTargetPath) {
        return null;
      }
      return itemCloned;
    });

    return treeCloneModified.filter((i) => i !== null);
  };

  dispatch(updateTree(treeDirectoryDeleteItem(tree)));
};

export default handleDelete;
