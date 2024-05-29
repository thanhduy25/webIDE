import EditorCmponent from "./component/EditorCmponent";
import FileTree from "./component/FileTree";
import {Flex,Box,Link,Button} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Navbar from "./component/Navbar";
import Comment from "./component/Comment";
import ContextMenu from "./component/ContextMenu";
import CommitUI from "./component/CommitUI";
import data from "./component/data.js";
import axios from "axios";

  const App = () => {
 //define 
    const [showFileTree, setShowFileTree] = useState(true);
    const [currentFile, setCurrentFile] = useState(null);
    const [files, setFiles] = useState(data);
    const [listFile, setListFile] = useState([]);


//handle

      const getFileTree = () => {
        axios.get('http://localhost/mod/gitlab/api/index.php/repository/tree?id=1')
          .then(res => {
            setListFile(res.data.data);
          })
          .catch(error => {
            console.error('Error fetching list of files:', error);
          });
      };

      useEffect(() => {
        const savedFiles = localStorage.getItem('files');
        if (savedFiles) {
          setFiles(JSON.parse(savedFiles));
        } else {
          setFiles(data);
        }
      }, []);

      useEffect(() => {
        if (files.length > 0) {
          localStorage.setItem('files', JSON.stringify(files));
        }
      }, [files]);

      useEffect(() => {
        getFileTree();
      }, []);

    const [showCommit, setShowCommit] = useState(false);
      const toggleFileTree = () => {
        setShowFileTree(!showFileTree);
        if (showCommit) setShowCommit(false); 
      };

      const toggleCommit = () => {
        setShowCommit(!showCommit);
        if (showFileTree) setShowFileTree(false); 
      };

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
      const updateFileContent = (files, fileName, newContent) => {
        return files.map(item => {
          if (item.type === 'file' && item.name === fileName) {
            return { ...item, content: newContent };
          }
          if (item.children) {
            return { ...item, children: updateFileContent(item.children, fileName, newContent) };
          }
          return item;
        });
      };
  
      const updatedFiles = updateFileContent(files, currentFile.name, currentFile.content);
      setFiles(updatedFiles);
      localStorage.setItem('files', JSON.stringify(updatedFiles));
      refreshFilesFromLocalStorage();
    };
  
    const refreshFilesFromLocalStorage = () => {
      const savedFiles = localStorage.getItem('files');
      if (savedFiles) {
        setFiles(JSON.parse(savedFiles));
      }
    };
  
    const onUpload = () => {
      document.getElementById("fileInput").click();
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log("Đã chọn tệp:", file);
    };

    const handleBackClick = () => {
     window.location.href = 'http://localhost/mod/gitlab/view.php?id=33';
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
      <ContextMenu></ContextMenu>
      <Box bg="#eeeeee" h="30px">
            <Flex justifyContent="flex-start" gap={5}>
                <Button
                  ml="29px"
                  mt="5px"
                  colorScheme="blue"
                  variant="solid"
                  w="45px"
                  h="20px"
                  color="black"
                  backgroundColor="#d65bb7;" 
                  borderRadius = "3px"
                  border="0px"
                  _hover={{
                    bg: "#818181",
                    textDecoration: "underline",
                  }}
                >
                  <Link onClick={handleBackClick} color="blue.400" cursor="pointer">
                    Back
                  </Link>
                </Button>
                {currentFile && (
                  <Box><Button
                  mt="5px"
                  colorScheme="blue"
                  size="md"
                  variant="solid"
                  w="45px"
                  h= "20px"
                  color="black"
                  backgroundColor="#d65bb7" 
                  borderRadius = "3px"
                  border="0px"
                  onClick={saveFile}
                  _hover={{
                    bg: "#818181",
                    textDecoration: "underline",
                  }}
                >
                  Save
                </Button>
                </Box>
                  
                  )}
                  
            </Flex>
          </Box>
      </Box>
      <Flex flexDirection="row" height="100%">
        <Box borderRight="1px solid #ddd">
          <Flex flexDirection="row" height="100%">
            <Navbar 
              onSelectFile={handleFileSelect} 
              onCommit={() => {}} 
              toggleFileTree={toggleFileTree}
              toggleCommit={toggleCommit} 
              onUpload={onUpload}
            />
            <Box display="flex" flexDirection="row">
              <Button onClick={getFileTree} />
              {showCommit && <CommitUI />}
              {showFileTree && (
                <FileTree 
                  data={listFile}
                  onFileSelect={handleFileSelect} 
                  // onAddFolder={handleAddFolder}
                  // onAddFile={handleAddFile}
                  // onRename={handleRename}
                  // onDelete={handleDelete}
                >
                  </FileTree>
              )}
            </Box>
          </Flex>
        </Box>
        <Box flex="1">
          <Flex flexDirection="column" height="90%">
            <Box flex="1">
              {currentFile && (
                <Box>
                <EditorCmponent 
                  file={currentFile} 
                  onContentChange={handleContentChange}
                />
                </Box>

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

