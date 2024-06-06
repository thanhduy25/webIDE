import {
  EditorComponent,
  FileTree,
  Navbar,
  Comment,
  CommitUI,
  BackButton,
  SaveButton,
  HandleFileModal,
  ContextMenu,
  AlertComponent,
} from "./component";

import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { closeContextMenu } from "./store/contextMenuSlice";
import { closeAlertDialog } from "./store/alertDialogSlice";
import {
  updateTree,
  convertTreeDirectoryFlatten,
  handleSave,
} from "./store/treeSlice";

import { getParams, handleDelete } from "./utilities";
import { setGlobalData } from "./store/globalDataSlice";
import { useHotkeys } from "react-hotkeys-hook";

import { setFileEditing } from "./store/editorSlice";

function App() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const { treeDirectory, fileTarget } = useSelector((state) => state.tree);
  const { isOpen: isOpenModal } = useSelector((state) => state.modal);
  const { isOpen: isOpenAlertDialog } = useSelector(
    (state) => state.alertDialog
  );
  const { fileEditing } = useSelector((state) => state.editor);

  const { contentShow } = useSelector((state) => state.navbar);

  //Get data passed from the parent window (view_ide.php)
  useEffect(() => {
    window.onmessage = function ({ data }) {
      const params = getParams();

      if ("author_name" in data && "author_email" in data) {
        dispatch(
          setGlobalData({
            courseId: params.id,
            projectId: params.project_id,
            branch: params.branch,
            authorName: data.author_name,
            authorEmail: data.author_email,
          })
        );
      }
    };
  }, []);

  //Get file tree
  useEffect(() => {
    if (localStorage.actions) {
      localStorage.actions = "";
    }

    const getFileTree = async (params) => {
      const baseUrl = `http://localhost/mod/gitlab/api/index.php/repository/tree`;

      const queryParams = new URLSearchParams({
        project_id: params.project_id,
        ref: params.branch,
        recursive: true,
      }).toString();

      try {
        const response = await axios.get(baseUrl + "?" + queryParams);

        dispatch(updateTree(response.data.data));
        dispatch(convertTreeDirectoryFlatten());
      } catch (error) {
        console.error("Error fetching list of files:", error);
      }
    };
    const params = getParams();

    dispatch(
      setGlobalData({
        projectId: params.project_id,
        branch: params.branch,
      })
    );

    getFileTree(params);
  }, []);

  const onSave = () => {
    dispatch(
      handleSave({
        path: fileEditing.path,
        newContent: editorRef.current.getValue(),
      })
    );
    dispatch(setFileEditing({ ...fileEditing, hasChanged: false }));
  };

  useHotkeys("ctrl+s", (event) => {
    event.preventDefault();
    onSave();
  });

  //render ui
  return (
    <ChakraProvider>
      <Box
        width="100vw"
        height="100vh"
        onClick={() => dispatch(closeContextMenu())}
      >
        <Box>
          <Box bgGradient="linear(to-r, #f58f0a, #f5390a)" h="40px">
            <ContextMenu />
            {isOpenModal && <HandleFileModal />}
            {isOpenAlertDialog && (
              <AlertComponent
                onCancelClick={() => dispatch(closeAlertDialog())}
                onDeleteClick={() => {
                  dispatch(closeAlertDialog());
                  handleDelete(fileTarget, dispatch);
                }}
              />
            )}

            <Flex justifyContent="flex-start" gap={5}>
              <BackButton onClick={() => handleBackClick(1)} />
              {fileEditing && <SaveButton onClick={onSave} />}
            </Flex>
          </Box>
        </Box>
        <Flex flexDirection="row" height="100%">
          <Box borderRight="1px solid #ddd">
            <Flex flexDirection="row" height="100%">
              <Box bgGradient="linear(to-t,,#f5390a,  #f58f0a)">
                <Navbar />
              </Box>

              {contentShow && (
                <>
                  {contentShow === "commit" && <CommitUI />}
                  {contentShow === "tree" && (
                    <FileTree data={treeDirectory}></FileTree>
                  )}
                </>
              )}
            </Flex>
          </Box>
          <Box flex="1">
            <Flex flexDirection="column" height="80%">
              <Box flex="1">
                <Box bg="transparent">
                  <EditorComponent ref={editorRef} />
                </Box>
              </Box>
            </Flex>
            <Box bg="#dd631c">
              <Comment />
            </Box>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
