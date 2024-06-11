import { Box, Image } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFileEditing } from "../store/editorSlice";

const EditorComponent = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const { fileEditing } = useSelector((state) => state.editor);
  const { treeDirectoryFlatten } = useSelector((state) => state.tree);

  function handleEditorDidMount(editor, _) {
    ref.current = editor;
  }

  const handleEditorChange = (value) => {
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

  const resizeEditor = useCallback(() => {
    if (ref?.current) {
      ref.current.layout();
    }
  }, [ref]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(resizeEditor);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeEditor]);

  const componentShow = () => {
    if (fileEditing) {
      if (fileEditing.isImage) {
        return (
          <div
            style={{
              width: "100%",
              height: "90vh",
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
        <Box ref={containerRef} height="90vh" width="100%">
          <Editor
            height="100%"
            width="100%"
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
  return (
    <Box height="100%" width="100%">
      {componentShow()}
    </Box>
  );
});

export default EditorComponent;
