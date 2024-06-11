import axios from "axios";

const isItemExistedTreeDirectory = (treeFlatten, path) =>
  Object.hasOwn(treeFlatten, path);

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
      id: globalData.projectId,
      branch: globalData.branch,
      commit_message: message,
      author_name: globalData.authorName,
      author_email: globalData.authorEmail,
      actions: actionsConfirm,
    }
  );
  if (response.data.status === "success") {
    localStorage.actions = "";
  }
};

export { isItemExistedTreeDirectory, handleCommit };
