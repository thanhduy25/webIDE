import theme from "./theme";
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

import {
  Flex,
  Box,
  ChakraProvider,
  useColorMode,
  IconButton,
  ColorModeScript,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { closeContextMenu } from "./store/contextMenuSlice";
import { closeAlertDialog } from "./store/alertDialogSlice";
import {
  updateTree,
  convertTreeDirectoryFlatten,
  handleSave,
} from "./store/treeSlice";

import { handleDelete } from "./utilities";
import { setGlobalData } from "./store/globalDataSlice";
import { useHotkeys } from "react-hotkeys-hook";

import { FaSun, FaMoon } from "react-icons/fa";
import { setFileEditing, toggleTheme } from "./store/editorSlice";
import { getParams } from "./utilities";

function App() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const { courseId } = useSelector((state) => state.globalData);

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
      if ("author_name" in data && "author_email" in data) {
        dispatch(
          setGlobalData({
            projectId: data.project_id,
            courseId: data.course_id,
            authorName: data.author_name,
            authorEmail: data.author_email,
            branch: data.branch,
            userRole: data.user_role,
          })
        );

        if (localStorage.actions) {
          localStorage.actions = "";
        }

        const getFileTree = async () => {
          const baseUrl =
            import.meta.env.VITE_ORIGIN +
            "/mod/gitlab/api/index.php/repository/tree";

          const queryParams = new URLSearchParams({
            project_id: data.project_id,
            ref: data.branch,
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

        getFileTree();
      }
    };
  }, []);

  // Get file tree
  // useEffect(() => {
  //   if (localStorage.actions) {
  //     localStorage.actions = "";
  //   }

  //   const getFileTree = async (params) => {
  //     const baseUrl =
  //       import.meta.env.VITE_ORIGIN +
  //       "/mod/gitlab/api/index.php/repository/tree";

  //     const queryParams = new URLSearchParams({
  //       project_id: params.project_id,
  //       ref: params.branch,
  //       recursive: true,
  //     }).toString();

  //     try {
  //       const response = await axios.get(baseUrl + "?" + queryParams);

  //       dispatch(updateTree(response.data.data));
  //       dispatch(convertTreeDirectoryFlatten());
  //     } catch (error) {
  //       console.error("Error fetching list of files:", error);
  //     }
  //   };
  //   const params = getParams();

  //   dispatch(
  //     setGlobalData({
  //       projectId: params.project_id,
  //       branch: params.branch,
  //       courseId: null,
  //       authorName: "anonymous",
  //       authorEmail: "anonymous@example.com",
  //       userRole: null,
  //     })
  //   );

  //   getFileTree(params);
  // }, []);

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
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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

      {/* <Box
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
              <BackButton id={courseId} />
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
              <Box bg="#dd631c" w={"100%"} paddingY={"8px"} zIndex="999">
                <Comment isContentShow={contentShow} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box> */}
      <MainContainer
        dispatch={dispatch}
        courseId={courseId}
        fileEditing={fileEditing}
        onSave={onSave}
        contentShow={contentShow}
        treeDirectory={treeDirectory}
        editorRef={editorRef}
      />
    </ChakraProvider>
  );
}

const MainContainer = ({
  dispatch,
  courseId,
  fileEditing,
  onSave,
  contentShow,
  treeDirectory,
  editorRef,
}) => (
  <Box width="100%" height="100vh" onClick={() => dispatch(closeContextMenu())}>
    <Header
      courseId={courseId}
      fileEditing={fileEditing}
      onSave={onSave}
      dispatch={dispatch}
    />
    <Flex flexDirection="row" height="100%">
      <Sidebar contentShow={contentShow} treeDirectory={treeDirectory} />
      <ContentArea contentShow={contentShow} editorRef={editorRef} />
    </Flex>
  </Box>
);

const Header = ({ courseId, fileEditing, onSave, dispatch }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      padding={"0"}
      position="fixed"
      top="0"
      left="0"
      zIndex="4"
      w="100%"
      bgGradient="linear(to-r, #f58f0a, #f5390a)"
      h="40px"
    >
      <Flex justifyContent="space-between" alignItems="center" paddingX={0}>
        <BackButton id={courseId} />
        <Box>
          {fileEditing && <SaveButton onClick={onSave} />}
          <IconButton
            aria-label="Toggle Dark Mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={() => {
              toggleColorMode();
              dispatch(toggleTheme(colorMode));
            }}
            variant="ghost"
            ml={4}
          />
        </Box>
      </Flex>
    </Box>
  );
};

const Sidebar = ({ contentShow, treeDirectory }) => (
  <Box borderRight="1px solid #ddd">
    <Flex flexDirection="row" height="100%">
      <Box
        position="fixed"
        h="100%"
        bgGradient="linear(to-t, #f5390a, #f58f0a)"
      >
        <Navbar />
      </Box>
      {contentShow && (
        <Box marginLeft="50px">
          {contentShow === "commit" && <CommitUI />}
          {contentShow === "tree" && <FileTree data={treeDirectory} />}
        </Box>
      )}
    </Flex>
  </Box>
);

const ContentArea = ({ contentShow, editorRef }) => {
  const currentEditorRef = editorRef && editorRef.current;
  const { colorMode } = useSelector((state) => state.editor);
  return (
    <Box flex={"1"} ml={contentShow ? "0px" : "44px"} overflow="hidden">
      <Flex position="relative" flexDirection="column" height="100%">
        <Box position="relative" flex="1">
          <TabsEditing />
          <Box position="flexd" bg={colorMode === "dark" ? "black" : "white"}>
            <EditorComponent ref={editorRef} />
          </Box>
        </Box>
        <Box
          bg="#dd631c"
          w="100%"
          paddingY="8px"
          zIndex="999"
          position={"absolute"}
          bottom={0}
          right={0}
        >
          <Comment isContentShow={contentShow} />
        </Box>
      </Flex>
    </Box>
  );
};
export default App;
