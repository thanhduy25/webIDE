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

  const baseUrl = `http://localhost/mod/gitlab/api/index.php/repository/files`;

  const params = new URLSearchParams({
    project_id: projectId,
    ref: branch,
    file_path: item.path,
  }).toString();

  let isImage = false;

  if (item.type === "blob") {
    isImage = checkIsImage(item);
    let content = "";

    if (treeFlatten[item.path].content) {
      content = treeFlatten[item.path].content;
      itemSelected = { ...treeFlatten[item.path], content };
    } else {
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
    }

    dispatch(
      updateTreeDirectoryFlatten({
        action: "update",
        item: itemSelected,
      })
    );

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
