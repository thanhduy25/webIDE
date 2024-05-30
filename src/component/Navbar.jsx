import { Box, VStack, IconButton, Tooltip,LinearGradient } from '@chakra-ui/react';
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
    <Box color="black" width="30px" height="100vh" display="flex" flexDirection="column" alignItems="center" py={4}>
      <VStack spacing={12}>
        <Tooltip fontSize="15px" backgroundColor="black" color="white" label="Explorer" aria-label='A tooltip' placement="bottom">
            <IconButton
              icon={<FaFile style={{fontSize:'20px',color:"white" }} />}
              variant="ghost"
              colorScheme="whiteAlpha"
              style={{ backgroundColor: 'transparent' }}
              border='0px'
              onClick={handleToggle}
              _hover={{ color: "#1a5292", stroke: "blue" }}>
            </IconButton>
        </Tooltip>
        <Tooltip fontSize="15px" backgroundColor="black" color="white" label="Commit" aria-label='A tooltip' placement="bottom">
          <IconButton
            icon={<FaGitAlt style={{fontSize:'20px',color:"white"   }} />}
            onClick={toggleCommit}
            variant="ghost"
            colorScheme="whiteAlpha"
            style={{ backgroundColor: 'transparent' }}
            border='0px'
            _hover={{ color: "#1a5292", stroke: "blue" }}
          />
        </Tooltip>
        <Tooltip fontSize="15px" backgroundColor="black" color="white" label="Upload file" aria-label='A tooltip' placement="bottom">
          <IconButton
            icon={<FaFileUpload style={{fontSize:'20px',color:"white"   }} />}
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




