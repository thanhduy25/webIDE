import EditorCmponent from "./component/EditorCmponent";
import FileTree from "./component/FileTree";
import { Box, Grid ,Button, Stack} from '@chakra-ui/react';
import React, { useState } from 'react';
import data from "./component/data";
import Navbar from "./component/Navbar";
import Comment from "./component/Comment";
import MiniOption from "./component/MiniOption";
import useMenuRightClick from "./component/onMenuRightClick";


  const App = () => {

    const { x, y, showMenu } = useMenuRightClick();

    const [currentFile, setCurrentFile] = useState(null);
    const [files, setFiles] = useState(data);

    const handleFileSelect = (file) => {
      setCurrentFile(file);
    };

    const handleContentChange = (newContent) => {
      setCurrentFile((prevFile) => ({
        ...prevFile,
        content: newContent,
      }));
    };
    const saveFile = () => {
      const updateFiles = (items) => {
        return items.map(item => {
          if (item.type === 'folder') {
            return { ...item, children: updateFiles(item.children) };
          } else if (item.name === currentFile.name) {
            return { ...item, content: currentFile.content };
          } else {  
            return item;
          }
        });
      };
      setFiles(updateFiles(files));
    };

    const handleAddFile = (fileName, parentFolder) => {
      const newFile = {
        name: fileName,
        type: 'file',
        content: '// Your file content here'
      };
    
      const addFileToFolder = (folder) => {
        return {
          ...folder,
          children: [...folder.children, newFile]
        };
      };

      const updateFiles = (files) => {
        return files.map(item => {
          if (item.name === parentFolder.name && item.type === 'folder') {
            return addFileToFolder(item);
          }
          if (item.children) {
            return {
              ...item,
              children: updateFiles(item.children)
            };
          }
          return item;
        });
      };
    
      setFiles(prevFiles => updateFiles(prevFiles));
    };
    
    const handleAddFolder = (folderName, parentFolder) => {
      const newFolder = {
        name: folderName,
        type: 'folder',
        children: []
      };
    
      const addFolderToFolder = (folder) => {
        return {
          ...folder,
          children: [...folder.children, newFolder]
        };
      };
    
      const updateFiles = (files) => {
        return files.map(item => {
          if (item.name === parentFolder.name && item.type === 'folder') {
            return addFolderToFolder(item);
          }
          if (item.children) {
            return {
              ...item,
              children: updateFiles(item.children)
            };
          }
          return item;
        });
      };
    
      setFiles(prevFiles => updateFiles(prevFiles));
    };

    const [showChildren, setShowChildren] = useState(true);

    const handleToggle = () => {
        setShowChildren(!showChildren);
    };

    return (
      <Box width="100vw" height="100vh">
        {currentFile && (
          <Box onClick={saveFile} bg="#eeeeee" h='25px'>
            {currentFile && (
              <Button
                marginTop="2px"
                colorScheme="blue"
                size="md"
                variant="solid"
                w="50px"
                color="white"
                backgroundColor="black" 
                borderRadius = "5px"
                border="0px"
                onClick={saveFile}
              >
                Save
              </Button>
            )}
          </Box>
        )}
        <Grid templateColumns="2fr 8fr" height="100%">
          <Box borderRight="1px solid #ddd">
            <Grid templateColumns="1fr 9fr" height="100%">
              <Box>
                {showMenu && (
                  <div
                    style={{
                      position: "fixed",
                      top: y,
                      left: x,
                      backgroundColor: "#dddddd",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div>New File...</div>
                    <div>New Folder...</div>
                  </div>
                )}
                <Navbar
                   onClick={() => setShowChildren(!showChildren)}
                />
              </Box>
              {showChildren && (
                <Grid templateRows="3% 97%">
                <MiniOption />
                <FileTree 
                  onAddFolder={handleAddFolder}
                  onAddFile={handleAddFile}
                  data={data} 
                  onFileSelect={handleFileSelect} 
                />
              </Grid>
              )}
              
            </Grid>
          </Box>
          <Stack spacing={5}>
            <Box>
              <EditorCmponent 
                file={currentFile} 
                onContentChange={handleContentChange} 
              />
            </Box>
            <Box bg="#dddddd">
              <Comment />
            </Box> 
          </Stack>
        </Grid>
      </Box>
    );
    
  };

  export default App;