import axios from "axios";
import { useToast } from '@chakra-ui/react'


const isItemAddedInTreeDirectory = (tree, path, type) =>
  tree.some((item) => {
    if (item.path === path && item.type === type) {
      return true;
    }
    if (item.children && item.children.length > 0) {
      return isItemAddedInTreeDirectory(item.children, path, type);
    }
  });

// const isItemExistInCreateAction = (path) => {
//   const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
//   if (actions.length === 0) return false;
//   return actions.some((action) => action.path === path);
// }

const ChangeActionIfItemExistInCreateAction = (newName, path) => {
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return;

  const parentPath = path.split("/").slice(0, -1).join("/");

  const newPath = parentPath ? parentPath + "/" + newName : newName;

  let isExist = false;
  const newAction = actions.map(action => {
    if (action.action === "create" && action.file_path === path) {
      action.file_path = newPath;
      isExist = true
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
  };
  localStorage.actions = JSON.stringify(newAction);
}

const handleCommit = async (message, author_name, author_email) => {
  const toast = useToast()
  const actions = localStorage.actions ? JSON.parse(localStorage.actions) : [];
  if (actions.length === 0) return;


  // const response = await axios.post(
  //   "http://localhost/mod/gitlab/api/index.php/repository/commits",
  //   {
  //     id: 1,
  //     branch: "main",
  //     commit_message: "Test from WebIDE",
  //     author_name: "John Doe",
  //     author_email: "johndoe@example.com",
  //     actions: actions,
  //   }
  // );

  // console.log(isItemExistInCreateAction("F_2/F_2_1/adsad.txt"));
};

export { isItemAddedInTreeDirectory, ChangeActionIfItemExistInCreateAction, handleCommit };
