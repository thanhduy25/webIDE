import React, { useState, useRef } from "react";
import {
  Box,
  Input,
  Button,
  List,
  ListItem,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useSelector } from "react-redux";

import { handleCommit, handleFileSelected } from "../utilities";

const getNewFilesAndFolders = () => {
  const actionsString = localStorage.getItem("actions");
  const actions = actionsString ? JSON.parse(actionsString) : [];
  const newFilesAndFolders = [];

  actions.forEach((action) => {
    if (
      action.action === "create" ||
      action.action === "update" ||
      action.action === "move" ||
      action.action === "delete"
    ) {
      const fileName = action.file_path.split("/").pop();
      newFilesAndFolders.push(fileName);
    }
  });
  return newFilesAndFolders;
};

const CommitUI = () => {
  const newFilesAndFolders = getNewFilesAndFolders();
  const [commitMessage, setCommitMessage] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(null);
  const [commitWidth, setCommitWidth] = useState("300px");
  const [actions, setActions] = useState(
    localStorage.actions ? JSON.parse(localStorage.actions) : []
  );
  const commitHeight = "90vh";
  const toast = useToast();

  const { treeDirectoryFlatten } = useSelector((state) => state.tree);
  const { projectId, branch, authorName, authorEmail } = useSelector(
    (state) => state.globalData
  );

  const globalData = {
    projectId,
    branch,
    authorName,
    authorEmail,
  };

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialWidth(containerRef.current.clientWidth - e.clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isResizing) {
      const newWidth = initialWidth + e.clientX;
      setCommitWidth(newWidth + "px");
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsResizing(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const getActionAndColor = (action) => {
    switch (action) {
      case "create":
        return {
          color: "green",
          char: "U",
        };
      case "update":
        return {
          color: "orange",
          char: "M",
        };
      case "move":
        return {
          color: "orange",
          char: "M",
        };
      case "delete":
        return {
          color: "red",
          char: "D",
        };
    }
  };

  const generatePathInfo = (action) => {
    let pathInfo = {};
    if (action.action === "move") {
      pathInfo = {
        oldPath: action.previous_path,
        newPath: action.file_path,
      };
    } else if (action.action === "delete") {
      pathInfo = {
        oldPath: action.file_path,
      };
    }
    return pathInfo;
  };

  const renameDeleteCommit = (pathInfo) => {
    return (
      <Flex w="100%">
        <Box position={"relative"} display="inline-block">
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              borderTop: "1px solid black",
              transform: "translateY(-1px)",
            }}
          ></span>
          {pathInfo.oldPath}
        </Box>
        {pathInfo.newPath && (
          <Box ml={"2     px"}>
            <p>{`→ ${pathInfo.newPath}`}</p>
          </Box>
        )}
      </Flex>
    );
  };

  return (
    <>
      <Box
        ref={containerRef}
        style={{
          position: "relative",
          height: commitHeight,
          width: commitWidth,
          transition: "width 0.001s",
          borderRight: "1px solid #ddd",
          overflow: "hidden",
          marginTop: "35px",
        }}
        paddingX={"8px"}
      >
        <Box
          style={{
            position: "absolute",
            width: "10px",
            height: "100%",
            right: "0",
            top: "0",
            cursor: "col-resize",
          }}
          onMouseDown={handleMouseDown}
        ></Box>
        <VStack>
          <Box w="100%" mt={2} justifyContent="flex">
            <Input
              placeholder="Enter commit message"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              w="100%"
            />
          </Box>
          <Box w={"100%"} mt={2} justifyContent="flex">
            <Button
              border="0px"
              borderRadius="7px"
              bg="#e25d20"
              colorScheme="blue"
              w="100%"
              h="28px"
              onClick={() => {
                handleCommit(commitMessage, treeDirectoryFlatten, globalData);
                setActions([]);
                setCommitMessage("");
                toast({
                  position: "top",
                  title: "Commited !",
                  description: "All changes were saved on Gitlab. ",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Commit
            </Button>
          </Box>
          <Box margin={"3px"} w={"100%"}>
            <List spacing={1} style={{ textAlign: "left" }}>
              {actions.map((action, index) => {
                const { color, char } = getActionAndColor(action.action);
                let pathInfo = {};
                if (action.action === "move") {
                  pathInfo = {
                    oldPath: action.previous_path,
                    newPath: action.file_path,
                  };
                } else if (action.action === "delete") {
                  pathInfo = {
                    oldPath: action.file_path,
                  };
                }
                return (
                  <Box key={index}>
                    <Button
                      h="20px"
                      bg="transparent"
                      w="100%"
                      onClick={handleFileSelected}
                    >
                      <Flex w="100%" justifyContent={"space-between"}>
                        {action.action === "move" ||
                        action.action === "delete" ? (
                          renameDeleteCommit(pathInfo)
                        ) : (
                          <ListItem>{newFilesAndFolders[index]}</ListItem>
                        )}
                        <Box color={color}>{char}</Box>
                      </Flex>
                    </Button>
                  </Box>
                );
              })}
            </List>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default CommitUI;
