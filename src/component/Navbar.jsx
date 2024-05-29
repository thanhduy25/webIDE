import { Box, VStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FaFileUpload,FaFile ,FaGitAlt } from 'react-icons/fa';
import React, { useState } from 'react';


const Navbar = ({toggleCommit, onUpload, toggleFileTree }) => {
  const [showChildren, setShowChildren] = useState(true);

  const handleToggle = () => {
    setShowChildren(!showChildren);
    toggleFileTree();
  };
  
  const handleUpload = () => {
    document.getElementById("fileInput").click();
    onUpload();
  };

  return (
    <Box  bg="#eeeeee" color="black" width="30px" height="100%" display="flex" flexDirection="column" alignItems="center" py={4}>
      <VStack spacing={12}>
        <Tooltip placement="right">
            <IconButton
              icon={<FaFile style={{fontSize:'20px' }} />}
              variant="ghost"
              colorScheme="whiteAlpha"
              style={{ backgroundColor: 'transparent' }}
              border='0px'
              onClick={handleToggle}
              _hover={{ color: "#1a5292", stroke: "blue" }}>
            </IconButton>
        </Tooltip>
        <Tooltip placement="right">
          <IconButton
            icon={<FaGitAlt style={{fontSize:'20px'  }} />}
            onClick={toggleCommit}
            variant="ghost"
            colorScheme="whiteAlpha"
            style={{ backgroundColor: 'transparent' }}
            border='0px'
            _hover={{ color: "#1a5292", stroke: "blue" }}
          />
        </Tooltip>
        <Tooltip placement="right">
          <IconButton
            icon={<FaFileUpload style={{fontSize:'20px'  }} />}
            onClick={handleUpload}
            variant="ghost"
            colorScheme="whiteAlpha"
            style={{ backgroundColor: 'transparent' }}
            border='0px'
            _hover={{ color: "#1a5292", stroke: "blue" }}
          />
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default Navbar;




