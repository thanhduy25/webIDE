import React, { useState, useRef } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';

const CommitUI = ({ onCommit}) => {
  const [commitMessage, setCommitMessage] = useState('');
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(null);
  const [treeWidth, setTreeWidth] = useState("130px");
  const [treeHeight] = useState("100vh");

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setInitialWidth(containerRef.current.clientWidth - e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = initialWidth + e.clientX;
      setTreeWidth(newWidth + "px");
    }
  };

  const handleMouseUp = () => {
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


  // const handleCommitClick = () => {
  //   onCommit(commitMessage);
  //   setCommitMessage('');
  // };

  return (
    <Box ref={containerRef} style={{ position: "relative", height: treeHeight}}>
    <Box style={{height:treeHeight, width: treeWidth, transition: "width 0.001s", borderRight: "1px solid #ddd", overflow: "hidden" }}>
      <Box style={{ position: "absolute", width: "10px", height: "100%", right: "0", top: "0", cursor: "col-resize" }} onMouseDown={handleMouseDown}></Box>
      <Box>
        <Flex mt={2} justifyContent="flex">
            <Input
            placeholder="Enter commit message"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            w="900px"
          />
        </Flex>
      <Flex mt={2} justifyContent="flex">
        <Button border="0px" borderRadius="3px" bg="#d65bb7" colorScheme="blue" w="908px" >Commit</Button>
      </Flex>
    </Box> 
    </Box>
  </Box>
);
};

export default CommitUI;
