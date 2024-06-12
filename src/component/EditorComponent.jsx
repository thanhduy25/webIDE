import { Box, Image } from "@chakra-ui/react";
import Editor, { useMonaco } from "@monaco-editor/react";
import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFileEditing } from "../store/editorSlice";
import { handleSave } from "../store/treeSlice";

const EditorComponent = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const { colorMode, fileEditing } = useSelector((state) => state.editor);
  const { treeDirectoryFlatten } = useSelector((state) => state.tree);

  const handleEditorDidMount = useCallback(
    (editor, monaco) => {
      ref.current = editor;
      ref.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        () => {
          dispatch(
            handleSave({
              path: fileEditing.path,
              newContent: editor.getValue(),
            })
          );
          dispatch(setFileEditing({ ...fileEditing, hasChanged: false }));
        },
        ""
      );
      resizeEditor();
    },
    [ref, fileEditing]
  );

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

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Define the custom theme
      monaco.editor.defineTheme("myTheme", {
        base: "vs",
        inherit: true,
        rules: [
          {
            token: "comment",
            foreground: "#1388d6",
            fontStyle: "italic underline",
          },
          { token: "url", foreground: "0000FF" },
          { token: "markup.heading", foreground: "00FF00" },
        ],
        colors: {
          "editor.foreground": "#FFFFFF",
          "editor.selectionForeground": "#FFFFFF",
          "editor.background": "#0a1620",
          "editorCursor.foreground": "#FFFFFF",
          "editor.lineHighlightBackground": "#dce0e448",
          "editorLineNumber.foreground": "#fa8321",
          "editor.selectionBackground": "#dce0e448",
          "editor.inactiveSelectionBackground": "#dce0e448",
          "editorLineNumber.activeForeground": "#FFFFFF",
        },
      });
    }
  }, [monaco]);

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
            loading={<div>Loading...</div>}
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
            theme={colorMode === "dark" ? "myTheme" : "vs-light"}
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
