import { useSelector, useDispatch } from "react-redux";
import { updateTree } from "../../store/treeSlice.js";
import { useToast } from "@chakra-ui/react";
import {
  updateTreeDirectoryFlatten,
  convertFlattenToNestedTreeDirectory,
} from "../../store/treeSlice.js";

const InputFile = () => {
  const { fileTarget } = useSelector((state) => state.tree);
  const toast = useToast();
  //upload file to tree
  const dispatch = useDispatch();

  //handle
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;

        const newItem = {
          id: null,
          name: file.name,
          path:
            fileTarget === "root"
              ? file.name
              : fileTarget.path + "/" + file.name,
          content: file.type.includes("image/")
            ? fileData
            : fileData.split(",")[1],
          type: "blob",
        };
        dispatch(
          updateTreeDirectoryFlatten({
            action: "add",
            item: { [newItem.path]: newItem },
          })
        );

        dispatch(convertFlattenToNestedTreeDirectory());

        toast({
          position: "top",
          title: "File upload successful!",
          description: "File was saved",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input
      id="fileInput"
      type="file"
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  );
};

export default InputFile;
