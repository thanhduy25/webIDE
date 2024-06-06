import { Box, Image } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const EditorComponent = forwardRef((_, ref) => {
  const { fileEditing } = useSelector((state) => state.editor);

  function handleEditorDidMount(editor, _) {
    ref.current = editor;
  }

  const componentShow = () => {
    if (fileEditing) {
      console.log(fileEditing);
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
              maxHeight={"100%"}
              src={fileEditing.content}
              style={{ verticalAlign: "center" }}
              objectFit={"cover"}
            ></Image>
          </div>
        );
      }
      return (
        <Editor
          height="80vh"
          path={fileEditing.path}
          defaultLanguage={
            fileEditing.language === undefined
              ? "text"
              : fileEditing.language.toLowerCase()
          }
          defaultValue={fileEditing.content}
          onMount={handleEditorDidMount}
          saveViewState={true}
        />
      );
    }
  };

  // Nếu có file được chọn, hiển thị nội dung của file đó trong Editor
  return <Box>{componentShow()}</Box>;
});

export default EditorComponent;
