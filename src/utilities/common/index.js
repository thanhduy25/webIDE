import axios from "axios";
import { getParams } from "../index.js";

const isItemExistedTreeDirectory = (treeFlatten, path) =>
  Object.hasOwn(treeFlatten, path);

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

export { isItemExistedTreeDirectory, handleCommit };
