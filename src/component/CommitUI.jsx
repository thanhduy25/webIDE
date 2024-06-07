import React, { useState, useRef } from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { handleCommit } from "../utilities";
import { useSelector } from "react-redux";

const CommitUI = () => {
  const [commitMessage, setCommitMessage] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(null);
  const [commitWidth, setCommitWidth] = useState("250px");
  const commitHeight = "100vh";
  const toast = useToast();

  const { treeDirectoryFlatten } = useSelector((state) => state.tree);

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
        <Box>
          <Flex mt={2} justifyContent="flex">
            <Input
              placeholder="Enter commit message"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              w="100%"
            />
          </Flex>
          <Flex mt={2} justifyContent="flex">
            <Button
              border="0px"
              borderRadius="7px"
              bg="#e25d20"
              colorScheme="blue"
              w="100%"
              h="28px"
              onClick={() => {
                handleCommit(commitMessage, "", "", treeDirectoryFlatten);
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
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default CommitUI;
