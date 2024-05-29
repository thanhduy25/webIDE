import React from 'react';
import { Box } from '@chakra-ui/react';

const ViewFileSelect = ({ currentFile }) => {
  return (
    <Box
      bg="gray.700"
      color="white"
      p="2"
      mb="2"
      boxShadow="md"
    >
      {/* Hiển thị tên của currentFile */}
      {currentFile && (
        <p>{currentFile.name}</p>
      )}
    </Box>
  );
};

export default ViewFileSelect;
