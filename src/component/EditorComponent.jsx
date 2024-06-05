import { Box, Flex, Button, IconButton } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import React, { forwardRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFileOpening, setFileEditing } from "../store/editorSlice";
import { CloseIcon } from "@chakra-ui/icons";

const EditorComponent = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const { listFileOpening, fileEditing } = useSelector((state) => state.editor);

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

      return (
        <Editor
          height="80vh"
          path={fileEditing.path}
          defaultLanguage={fileEditing.language}
          defaultValue={fileEditing.content}
          onMount={handleEditorDidMount}
          saveViewState={true}
        />
      );
    }
  };

  const handleRemoveTab = (event, path) => {
    event.stopPropagation();

    const lenList = Object.keys(listFileOpening).length;
    const lastItem = Object.keys(listFileOpening)[lenList - 2];

    dispatch(setFileEditing(listFileOpening[lastItem]));
    dispatch(removeFileOpening(path));
  };

  // Nếu có file được chọn, hiển thị nội dung của file đó trong Editor
  return (
    <Box>
      <Flex>
        {Object.keys(listFileOpening).length > 0 &&
          Object.entries(listFileOpening).map(([path, fileOpening]) => {
            return (
              <Button
                key={path}
                bgColor={"transparent"}
                onClick={() => {
                  dispatch(setFileEditing(fileOpening));
                }}
                border={"1px"}
                borderColor={"gray"}
                borderRadius={"0"}
                _hover={{ bgColor: "transparent" }}
                paddingRight={"6px"}
              >
                {fileOpening.name}
                <Box
                  marginLeft={"16px"}
                  paddingX={"8px"}
                  paddingY={"4px"}
                  borderRadius={"4px"}
                  _hover={{ cursor: "pointer", bgColor: "gray.300" }}
                  zIndex={2}
                  onClick={(event) => handleRemoveTab(event, path)}
                >
                  <CloseIcon boxSize={"12px"} marginBottom={"3px"} />
                </Box>
              </Button>
            );
          })}
      </Flex>
      {componentShow()}
    </Box>
  );
});

export default EditorComponent;
