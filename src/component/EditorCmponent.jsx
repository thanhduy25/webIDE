import { Box } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import React from 'react';

const EditorCmponent = ({file, onContentChange }) => {

    if (!file) {
      return <Editor 
      theme = "vs-light"
      height="100vh" 
      defaultLanguage="javascript"
      value={"//Welcome to IDE"}
      /> ;
      }
      const handleChange = (value) => {
        onContentChange(value);
      };
    
  return (
    <Box>
        <Editor 
        theme = "vs-light"
        height="75vh" 
        defaultLanguage="javascript"
        value={file.content}
        onChange={handleChange} 
        /> 
    </Box> 
  )
}

export default EditorCmponent;