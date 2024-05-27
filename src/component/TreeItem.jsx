import React, { useState } from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';


const TreeItem = ({ item, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box>
      <Flex 
        width='100%' 
        height='20px' 
        alignItems="center" 
        onClick={item.type === 'folder' ? handleToggle : () => onFileSelect(item)} cursor="pointer" margin="5px"
        >
        {item.type === 'folder' ? (
          <Icon as={MdFolder} />
        ) : ( 
          <Icon color ='#dddddd' as={MdInsertDriveFile} />
        )}
        <Text ml="3">{item.name}</Text>
      </Flex>
      {isOpen && item.children && (
        <Box pl="10px" mt='5px'>
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} onFileSelect={onFileSelect} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TreeItem;



