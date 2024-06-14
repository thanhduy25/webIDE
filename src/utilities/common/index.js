import axios from "axios";

const isItemExistedTreeDirectory = (treeFlatten, path) =>
  Object.hasOwn(treeFlatten, path);

const checkIsImage = (item) => {
  return (
    item.name.endsWith(".png") ||
    item.name.endsWith(".jpg") ||
    item.name.endsWith(".jpeg") ||
    item.name.endsWith(".svg")
  );
};

const handleCommit = async (message, treeFlatten, globalData) => {
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return;

  const actionsConfirm = actions.map((action) => {
    if (
      action.action === "create" ||
      action.action === "update" ||
      action.action === "move"
    ) {
      const content = treeFlatten[action.file_path].content;

      if (checkIsImage(treeFlatten[action.file_path])) {
        return {
          ...action,
          content: content?.includes("base64,")
            ? content.split("base64,")[1]
            : content,
          encoding: "base64",
        };
      }

      if (treeFlatten[action.file_path].name)
        return {
          ...action,
          content,
        };
    }
    return action;
  });

  const response = await axios.post(
    import.meta.env.VITE_ORIGIN +
      "/mod/gitlab/api/index.php/repository/commits",
    {
      project_id: globalData.projectId,
      branch: globalData.branch,
      commit_message: message,
      author_name: globalData.authorName,
      author_email: globalData.authorEmail,
      actions: actionsConfirm,
    },
    {}
  );

  if (response.data.status === "success") {
    localStorage.actions = "";
  }
};

export { isItemExistedTreeDirectory, handleCommit };
