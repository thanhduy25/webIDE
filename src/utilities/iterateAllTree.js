const iterateAllFile = (tree, itemAdded) => {
  for (const item of tree) {
    if (item.path === itemAdded.path) {
      const itemAddedObj = {
        id: null,
        name: itemAdded.name,
        path: itemAdded.path,
        type: "tree",
      };

      if (itemAdded.type === "tree") {
        itemAddedObj.children = [];
      }
      return item.children.push(itemAddedObj);
    }

    if (item.children) {
      iterateAllFile(item.children);
    }

    return item;
  }
};

export default iterateAllFile;
