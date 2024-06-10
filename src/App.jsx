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
  TabsEditing,
} from "./component";

import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
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
        recursive: false,
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

      <Box
        width="100%"
        height="100vh"
        onClick={() => dispatch(closeContextMenu())}
      >
        <Box>
          <Box
            position={"fixed"}
            top={"0"}
            left={"0"}
            zIndex={"4"}
            w="100%"
            bgGradient="linear(to-r, #f58f0a, #f5390a)"
            h="40px"
          >
            <Flex justifyContent="flex-start" gap={5}>
              <BackButton />
              {fileEditing && <SaveButton onClick={onSave} />}
            </Flex>
          </Box>
        </Box>
        <Flex flexDirection="row" height="100%">
          <Box borderRight="1px solid #ddd">
            <Flex marginRight={"44px"} flexDirection="row" height="100%">
              <Box
                position={"fixed"}
                h={"100%"}
                bgGradient="linear(to-t,,#f5390a,  #f58f0a)"
              >
                <Navbar />
              </Box>
              {contentShow && (
                <Box marginLeft={"50px"}>
                  <>
                    {contentShow === "commit" && <CommitUI />}
                    {contentShow === "tree" && (
                      <FileTree data={treeDirectory}></FileTree>
                    )}
                  </>
                </Box>
              )}
            </Flex>
          </Box>
          <Box flex="1">
            <Flex flexDirection="column" height="100%">
              <Box position="relative" flex="1">
                <TabsEditing />
                <Box position="relative" bg="transparent">
                  <EditorComponent ref={editorRef} />
                </Box>
              </Box>
              <Box
                zIndex="7"
                position="fixed"
                bottom="0"
                bg="#dd631c"
                w={"100%"}
                paddingY={"8px"}
              >
                <Comment isContentShow={contentShow} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
