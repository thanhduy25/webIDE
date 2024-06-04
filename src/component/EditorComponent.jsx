import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditorComponent = ({ file, value, onContentChange }) => {
  const [fileContent, setFileContent] = useState("");
  const [isDisplayImg, setIsDisplayImg] = useState(false);


  // background
  monaco.editor.defineTheme("myTheme", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.foreground": "#052B4D",
      "editor.background": "#FFFFFF",
      "editorCursor.foreground": "#8B0000",
      "editor.lineHighlightBackground": "#BAD4EBC9",
      "editorLineNumber.foreground": "#BE561A",
      "editor.selectionBackground": "#88000030",
      "editor.inactiveSelectionBackground": "#88000015",
    },
  });
  monaco.editor.setTheme("myTheme");


  useEffect(() => {
    async function getFileContent() {
      const response = await axios({
        method: "get",
        url: `http://localhost/mod/gitlab/api/index.php/repository/files?id=1&ref=main&file_path=${file?.path}`,
        responseType: "json",
      });

      let content = response.data?.data?.content;

      if (content) {
        if (
          file.name.endsWith(".png") ||
          file.name.endsWith(".jpg") ||
          file.name.endsWith(".jpeg") ||
          file.name.endsWith(".svg")
        ) {
          content = `data:image/*;base64,${content}`;
          setIsDisplayImg(true);
          setFileContent(content);
        } else {
          setIsDisplayImg(false);
          setFileContent(atob(content));
        }
      }
    }
    getFileContent();
  }, [file]);

  // Nếu không có file được chọn, hiển thị một Editor rỗng
  // if (!file) {
  //   return (
  //     <Box bg="transparent">
  //       <Editor
  //         theme="vs-dark"
  //         height="75vh"
  //         defaultLanguage="javascript"
  //         value={"// Welcome to IDE"}
  //         onChange={onContentChange}
  //       />
  //     </Box>
  //   );
  // }

  // Nếu có file được chọn, hiển thị nội dung của file đó trong Editor
  return (
    <Box>
      {isDisplayImg ? (
        <div
          style={{
            width: "80vw",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={fileContent} style={{ verticalAlign: "center" }}></img>
        </div>
      ) : (
        <Editor
          // theme="vs-dark"
          height="80vh"
          // defaultLanguage="javascript"
          value={fileContent}
          onChange={(value) => {
            setFileContent(value);
            // onContentChange(value);
          }}
        />
      )}
    </Box>
  );
};

export default EditorComponent;
