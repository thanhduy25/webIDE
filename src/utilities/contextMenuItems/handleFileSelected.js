import axios from "axios";
import { updateTreeDirectoryFlatten } from "../../store/treeSlice";
import { addFileOpening, setFileEditing } from "../../store/editorSlice";
import { extensionFileMapping } from "../index";

const checkIsImage = (item) => {
  return (
    item.name.endsWith(".png") ||
    item.name.endsWith(".jpg") ||
    item.name.endsWith(".jpeg") ||
    item.name.endsWith(".svg")
  );
};

const handleFileSelected = async (
  projectId,
  branch,
  treeFlatten,
  item,
  dispatch
) => {
  let itemSelected = null;

  const baseUrl =
    import.meta.env.VITE_ORIGIN + "/mod/gitlab/api/index.php/repository/files";

  let isImage = false;

  if (item.type === "blob") {
    isImage = checkIsImage(item);
    let content = "";

    if (
      treeFlatten[item.path].content ||
      treeFlatten[item.path].content === ""
    ) {
      content = treeFlatten[item.path].content;
    } else {
      const actionsList = localStorage.actions
        ? JSON.parse(localStorage.actions)
        : [];
      let isExistInMoveStatus = {
        status: false,
        previous_path: null,
        index: null,
      };

      actionsList.forEach((action, index) => {
        if (action.action === "move" && action.file_path === item.path) {
          isExistInMoveStatus = {
            status: true,
            previous_path: action.previous_path,
            index,
          };
          return;
        }
      });

      const params = new URLSearchParams({
        project_id: projectId,
        ref: branch,
        file_path: isExistInMoveStatus.status
          ? encodeURI(isExistInMoveStatus.previous_path)
          : encodeURI(item.path),
      }).toString();
      console.log(baseUrl + "?" + params);
      const response = await axios.get(baseUrl + "?" + params);
      content = response.data?.data?.content;

      if (content) {
        if (isImage) {
          content = `data:image/*;base64,${content}`;
        } else {
          content = atob(content);
        }
      } else {
        content = "";
      }
      itemSelected = { ...item, content, originalContent: content };

      if (isExistInMoveStatus.status) {
        actionsList[isExistInMoveStatus.index] = {
          ...actionsList[isExistInMoveStatus.index],
          content: content,
          originalContent: content,
        };

        localStorage.actions = JSON.stringify(actionsList);
        dispatch(
          updateTreeDirectoryFlatten({
            action: "update",
            item: itemSelected,
          })
        );
      } else {
        dispatch(
          updateTreeDirectoryFlatten({
            action: "update",
            item: itemSelected,
          })
        );
      }
    }

    dispatch(
      addFileOpening({
        [item.path]: {
          name: item.name,
          language: extensionFileMapping[item.path.split(".").pop()],
          path: item.path,
          content,
          isImage,
        },
      })
    );
    dispatch(
      setFileEditing({
        name: item.name,
        language: extensionFileMapping[item.path.split(".").pop()],
        path: item.path,
        content,
        isImage,
        hasChanged: false,
      })
    );
  }
};

export default handleFileSelected;
