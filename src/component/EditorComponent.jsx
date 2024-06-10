import { Box, Image } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabsEditing from "./Editor/TabsEditing";
import { setFileEditing } from "../store/editorSlice";
import { useHotkeys } from "react-hotkeys-hook";

const EditorComponent = forwardRef((_, ref) => {
  const dispatch = useDispatch();

  const { fileEditing } = useSelector((state) => state.editor);
  const { treeDirectoryFlatten } = useSelector((state) => state.tree);

  function handleEditorDidMount(editor, _) {
    ref.current = editor;
  }

  const handleEditorChange = (value) => {
    console.log(value);
    console.log("---", treeDirectoryFlatten[fileEditing.path].content);
    console.log(value !== treeDirectoryFlatten[fileEditing.path].content);
    if (value !== treeDirectoryFlatten[fileEditing.path].content) {
      dispatch(
        setFileEditing({ ...fileEditing, content: value, hasChanged: true })
      );
    } else {
      dispatch(
        setFileEditing({ ...fileEditing, content: value, hasChanged: false })
      );
    }
  };

  const componentShow = () => {
    if (fileEditing) {
      if (fileEditing.isImage) {
        return (
          <div
            style={{
              width: "100%",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              maxHeight={"80%"}
              src={fileEditing.content}
              style={{ verticalAlign: "center" }}
              objectFit={"cover"}
            ></Image>
          </div>
        );
      }

      return (
        <Box>
          <Editor
            height="90vh"
            path={fileEditing.path}
            defaultLanguage={
              fileEditing.language === undefined
                ? "text"
                : fileEditing.language.toLowerCase()
            }
            defaultValue={fileEditing.content}
            onMount={handleEditorDidMount}
            onChange={(value) => {
              handleEditorChange(value);
            }}
            saveViewState={true}
          />
        </Box>
      );
    }
  };

  // Nếu có file được chọn, hiển thị nội dung của file đó trong Editor
  return <Box>{componentShow()}</Box>;
});

export default EditorComponent;
