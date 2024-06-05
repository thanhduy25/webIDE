import axios from "axios";
import { getParams } from "../index.js";

const isItemExistedTreeDirectory = (treeFlatten, path) =>
  Object.hasOwn(treeFlatten, path);

const isItemExistInCreateAction = (path) => {
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return false;
  return actions.some((action) => action.path === path);
};

const ChangeActionIfItemExistInCreateAction = (newName, path) => {
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return;

  const parentPath = path.split("/").slice(0, -1).join("/");

  const newPath = parentPath ? parentPath + "/" + newName : newName;

  let isExist = false;
  const newAction = actions.map((action) => {
    if (action.action === "create" && action.file_path === path) {
      action.file_path = newPath;
      isExist = true;
    }
    return action;
  });

  if (!isExist) {
    newAction.push({
      action: "move",
      file_path: newPath,
      previous_path: path,
      content: "",
    });
  }
  localStorage.actions = JSON.stringify(newAction);
};

const handleCommit = async (message, author_name, author_email) => {
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return;

  const params = getParams();
  const response = await axios.post(
    "http://localhost/mod/gitlab/api/index.php/repository/commits",
    {
      id: params.project_id,
      branch: params.branch,
      commit_message: message,
      author_name: "John Doe",
      author_email: "johndoe@example.com",
      actions: actions,
    }
  );
  console.log(response.data);
};

export {
  isItemExistedTreeDirectory,
  ChangeActionIfItemExistInCreateAction,
  handleCommit,
};
