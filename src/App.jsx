import {
  EditorComponent,
  FileTree,
  Navbar,
  Comment,
  CommitUI,
  data,
  BackButton,
  SaveButton,
  HandleFileModal,
  ContextMenu,
  AlertComponent,
} from "./component";
import { getParams } from "./utilities";

import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { closeContextMenu } from "./store/contextMenuSlice";
import { closeAlertDialog } from "./store/alertDialogSlice";
import { updateTree } from "./store/treeSlice";
import { handleDelete } from "./utilities";

function App() {
  const dispatch = useDispatch();
  const { treeDirectory, fileEditing, fileTarget } = useSelector(
    (state) => state.tree
  );
  const { isOpen: isOpenModal } = useSelector((state) => state.modal);
  const { isOpen: isOpenAlertDialog } = useSelector(
    (state) => state.alertDialog
  );

  const { contentShow } = useSelector((state) => state.navbar);

  //Get file tree
  useEffect(() => {
    const getFileTree = async (data) => {
      const baseUrl =
        "http://localhost/mod/gitlab/api/index.php/repository/tree?id=1&recursive=false";
      const queryParams = new URLSearchParams(data).toString();
      try {
        const response = await axios.get(baseUrl + "?" + queryParams);
        dispatch(updateTree(response.data.data));
      } catch (error) {
        console.error("Error fetching list of files:", error);
      }
    };
    const params = getParams();
    getFileTree(params);
  }, []);

  //render ui
  return (

    <ChakraProvider>
      <Box
        width="100vw"
        height="100vh"
        onClick={() => dispatch(closeContextMenu())}
      >
        <Box>
          <Box bgGradient="linear(to-r,  #f58f0a,#f5390a)" h="30px">
            <ContextMenu />
            {isOpenModal && <HandleFileModal />}
            {isOpenAlertDialog && (
              <AlertComponent
                onCancelClick={() => dispatch(closeAlertDialog())}
                onDeleteClick={() => {
                  dispatch(closeAlertDialog());
                  handleDelete(fileTarget, treeDirectory, dispatch);
                }}
              />
            )}
            <Flex justifyContent="flex-start" gap={5}>
              <BackButton onClick={() => handleBackClick(1)} />
              {fileEditing && <SaveButton />}
            </Flex>
          </Box>
        </Box>
        <Flex flexDirection="row" height="100%">
          <Box borderRight="1px solid #ddd">
            <Flex flexDirection="row" height="100%">
              <Box p="2px 2px" bgGradient="linear(to-t,,#f5390a,  #f58f0a)">
                <Navbar onCommit={() => { }} />
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
                  <EditorComponent
                    file={fileEditing.item}
                  // onContentChange={handleContentChange}
                  // content={fileContent}
                  />
                </Box>

                {/* )} */}
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
