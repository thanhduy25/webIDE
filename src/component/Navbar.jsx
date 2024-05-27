import React, { useState } from 'react';
import { Box,Collapse,useDisclosure, VStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FaFileUpload ,FaFile, FaGitAlt } from 'react-icons/fa';



const Navbar = ({ onSelectFile, onCommit, onUpload }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [showChildren, setShowChildren] = useState(true);

  const handleToggle = () => {
    setShowChildren(!showChildren);
};

  return (
    <Box  bg="#eeeeee" color="black" width="30px" height="100%" display="flex" flexDirection="column" alignItems="center" py={4}>
      <VStack spacing={12}>
        <Tooltip placement="right">
          <Box>
            <IconButton 
              icon={<FaFile style={{fontSize:'20px' }} />}
              onClick={() => setShowChildren(!showChildren)}
              variant="ghost"
              colorScheme="whiteAlpha"
              style={{ backgroundColor: 'transparent' }}
              border='0px'
              _hover={{ color: "#1a5292", stroke: "blue" }}>
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip placement="right">
          <IconButton
            icon={<FaGitAlt style={{fontSize:'20px'  }} />}
            onClick={onCommit}
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
            onClick={onUpload}
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



