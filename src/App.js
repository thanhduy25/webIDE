import EditorCmponent from "./component/EditorCmponent";
import FileTree from "./component/FileTree";
import {Flex,Box,Button} from '@chakra-ui/react';
import React, { useState } from 'react';
import data from "./component/data";
import Navbar from "./component/Navbar";
import Comment from "./component/Comment";
import ContextMenu from "./component/ContextMenu";


  const App = () => {
 //define 
   
    const [showFileTree, setShowFileTree] = useState(true);

    const [currentFile, setCurrentFile] = useState(null);
    const [files] = useState(data);
//handle

    const handleFileSelect = (file) => {
      setCurrentFile(file);
    };

  
    const handleContentChange = (newContent) => {
      setCurrentFile((prevFile) => ({
        ...prevFile,
        content: newContent,
      }));
    };
    
    const toggleFileTree = () => {
      setShowFileTree(!showFileTree);
    };
    const onUpload = () => {
      document.getElementById("fileInput").click();
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log("Đã chọn tệp:", file);
    };
//render ui
    return (
      <Box width="100vw" height="100vh">
        <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box>
      <Box bg="#eeeeee" h="30px">
            <Flex justifyContent="flex-start" gap={3}>
                <Button
                  ml="29px"
                  colorScheme="blue"
                  size="md"
                  variant="solid"
                  w="40px"
                  h="29px"
                  color="black"
                  backgroundColor="#d65bb7;" 
                  borderRadius = "2px"
                  border="0px"
                  _hover={{
                    bg: "#818181",
                    textDecoration: "underline",
                  }}
                >
                  Back
                </Button>
                {currentFile && (
                  <Button
                    colorScheme="blue"
                    size="md"
                    variant="solid"
                    w="40px"
                    color="black"
                    backgroundColor="#d65bb7" 
                    borderRadius = "2px"
                    border="0px"
                    // onClick={saveFile}
                    _hover={{
                      bg: "#818181",
                      textDecoration: "underline",
                    }}
                  >
                    Save
                  </Button>
                  )}
            </Flex>
          </Box>
      </Box>
      <Flex flexDirection="row" height="100%">
        <Box borderRight="1px solid #ddd">
          <Flex flexDirection="row" height="100%">
          <ContextMenu></ContextMenu>
            <Navbar 
              onSelectFile={handleFileSelect} 
              onCommit={() => {}} 
              toggleFileTree={toggleFileTree}
              onUpload={onUpload}
            />
            <Box >
              {showFileTree && (
                <FileTree 
                  data={files} 
                  onFileSelect={handleFileSelect} 
                  // onAddFolder={handleAddFolder}
                  // onAddFile={handleAddFile}
                  // onRename={handleRename}
                  // onDelete={handleDelete}
                  className="file-tree"
                />
              )}
            </Box>
          </Flex>
        </Box>
        <Box flex="1">
          <Box h="20px">
          </Box>
          <Flex flexDirection="column" height="90%">
            <Box flex="1">
              {currentFile && (
                <EditorCmponent 
                  file={currentFile} 
                  onContentChange={handleContentChange}
                />
              )}
            </Box>
            <Box bg="#dddddd">
              <Comment />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
    );
  };
  
  export default App;

