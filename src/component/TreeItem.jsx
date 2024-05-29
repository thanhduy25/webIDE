import React, { useState } from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';


const TreeItem = ({ item, onFileSelect, onAddFolder,onAddFile}) => {
  const [isOpenfile, setIsOpenfile] = useState(false);

  const handleTogglefile = () => {
    setIsOpenfile(!isOpenfile);
  };
  
  return (
    <Box>
      <Flex 
        width='100%' 
        height='20px' 
        alignItems="center" 
        onClick={item.type === 'tree' ? handleTogglefile : () => onFileSelect(item)}
        margin="5px"
        _hover={{
          bg: "#ececec",
          textDecoration: "underline",
        }}
        >
        {item.type === 'tree' ? (
          <Icon as={MdFolder} />
        ) : ( 
          <Icon color ='#dddddd' as={MdInsertDriveFile} />
        )}
        <Text ml="3">{item.name}</Text>
      </Flex>
      {isOpenfile && item.children && (
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