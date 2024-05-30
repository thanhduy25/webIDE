import { Box } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import React, { useState } from 'react';

const EditorComponent = ({ file, onContentChange }) => {
  const [fileContent, setFileContent] = useState('');


  // Nếu không có file được chọn, hiển thị một Editor rỗng
  // if (!file) {
  //   return (
  //     <Box bg="transparent">
  //       <Editor 
  //         theme="vs-dark"
  //         height="75vh" 
  //         defaultLanguage="javascript"
  //         value={"// Welcome to IDE"}
  //         onChange={onContentChange} 
  //       /> 
  //     </Box>
  //   );
  // }

  // Nếu có file được chọn, hiển thị nội dung của file đó trong Editor
  return (
    <Box>
      <Editor 
        // theme="vs-dark"
        height="80vh" 
        defaultLanguage="javascript"
        value={fileContent}
        onChange={(value) => {
          // setFileContent(value);
          // onContentChange(value);
        }} 
      /> 
    </Box>
  );
};

export default EditorComponent;
