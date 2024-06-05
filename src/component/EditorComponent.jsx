import { Box } from "@chakra-ui/react";
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
      if (fileEditing.isImage) {
        return (
          <div
            style={{
              width: "80vw",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={fileEditing.content}
              style={{ verticalAlign: "center" }}
            ></img>
          </div>
        );
      }
      console.log(fileEditing);
      return (
        <Editor
          height="80vh"
          path={fileEditing.path}
          defaultLanguage={fileEditing.language.toLowerCase()}
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
