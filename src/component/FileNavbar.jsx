import React, { useState } from 'react';
import { Stack, Box, Flex, Text, Icon, useDisclosure} from '@chakra-ui/react';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';
import FileTree from './FileTree';

const FileNavbar = ({ item, onFileSelect }) => {

    const { isOpen, onToggle } = useDisclosure();
    const [showChildren, setShowChildren] = useState(true);

    const handleToggle = () => {
        setShowChildren(!showChildren);
    };


  return (
    <Box>
        <Stack>
            <Box borderWidth="0px" borderRadius="lg" p="4">
                <Flex alignItems="flex-statr">
                    <IconButton
                        aria-label="Thêm file"
                        icon={<CgFileAdd />}
                        colorScheme="teal"
                        variant="outline"
                        mr="2"
                        border='0px'
                        style={{ backgroundColor: 'transparent' }}
                        onClick={() => setShowChildren(!showChildren)}
                    />
                    <IconButton
                        aria-label="Thêm folder"
                        icon={<CgFolderAdd />}
                        colorScheme="teal"
                        variant="outline"
                        border='0px'
                        style={{ backgroundColor: 'transparent' }}
                    />
                    <IconButton
                        icon={<FaFileUpload style={{fontSize:'20px'  }} />}
                        onClick={onUpload}
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        style={{ backgroundColor: 'transparent' }}
                        border='0px'
                        _hover={{ color: "#1a5292", stroke: "blue" }}
                    />
                </Flex>
            </Box>
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

            {showChildren && isOpen && item.children && (
                <Box pl="10px" mt='5px'>
                    {item.children.map((child, index) => (
                        <FileTree key={index} item={child} onFileSelect={onFileSelect} />
                    ))}
                </Box>
            )}
            </Box>
        </Stack>
    </Box>
  );
};

export default FileNavbar;






