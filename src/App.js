import EditorComponent from "./component/EditorComponent";
import FileTree from "./component/FileTree";
import {Flex,Box,Link,Button,ChakraProvider,useColorMode} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Navbar from "./component/Navbar";
import Comment from "./component/Comment";
import ContextMenu from "./component/ContextMenu";
import CommitUI from "./component/CommitUI";
import data from "./component/data.js";
import axios from "axios";

  function App() {
 //define 
    const [showFileTree, setShowFileTree] = useState(true);
    const [currentFile, setCurrentFile] = useState(null);
    const [files, setFiles] = useState(data);
    const [listFile, setListFile] = useState([]);
    const [fileContent, setFileContent] = useState('');
    // const { colorMode, toggleColorMode } = useColorMode();



//handle

      const getFileTree = () => {
        axios.get('http://localhost/mod/gitlab/api/index.php/repository/tree?id=1&recursive=true')
          .then(res => {
            console.log(res.data.data);
            setListFile(res.data.data);
          })
          .catch(error => {
            console.error('Error fetching list of files:', error);
          });
      };

      const getFileContent = (file) => {
        axios.get('http://localhost/mod/gitlab/api/index.php/repository/files?id=1&file_path=FI_5.txt')
          .then(res => {
            setFileContent(res.data.data);
          })
          .catch(error => {
            console.error('Error fetching file content:', error);
          });
      };
      // const handleFileSelect = (file) => {
      //   setCurrentFile(file);
      //   getFileContent(file);
      // };

      const handleContentChange = (content) => {
       
        console.log('Content changed:', content);
        setFileContent(content);
        saveFileContent(currentFile, content);
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


    const saveFileContent = (file, content) => {
      axios.post(`http://localhost/mod/gitlab/api/index.php/repository/blob?id=${file.id}`, { data })
        .then(res => {
          console.log('File content saved successfully:', res);
        })
        .catch(error => {
          console.error('Error saving file content:', error);
        });
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
      <ChakraProvider>
        <Box width="100vw" height="100vh">
        <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box>
      <Box bgGradient='linear(to-r,  #f58f0a,#f5390a)' h="30px">
      <ContextMenu position="absolute"></ContextMenu>
            <Flex justifyContent="flex-start" gap={5}>
                <Button
                  ml="29px"
                  mt="5px"
                  variant="solid"
                  // w="45px"
                  h="20px"
                  // color="black"
                  backgroundColor="white" 
                  borderRadius = "3px"
                  border="0px"
                  _hover={{
                    bg: "#818181",
                    textDecoration: "underline",
                  }}
                >
                  <Link onClick={handleBackClick} color="#ec5d0b" cursor="pointer">
                    Back
                  </Link>
                </Button>
                {currentFile && (
                  <Button
                  mt="5px"
                  color=""
                  colorScheme="blue"
                  size="md"
                  variant="solid"
                  // w="45px"
                  h= "20px"
                  // color="black"
                  backgroundColor="white" 
                  borderRadius = "3px"
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
                  {/* <Button>

                  </Button> */}
            </Flex>
          </Box>
      </Box>
      <Flex flexDirection="row" height="100%">
        <Box borderRight="1px solid #ddd">
          <Flex flexDirection="row" height="100%">
            <Box bgGradient='linear(to-t,,#f5390a,  #f58f0a)'>
            <Navbar 
              // onSelectFile={handleFileSelect} 
              onCommit={() => {}} 
              toggleFileTree={toggleFileTree}
              toggleCommit={toggleCommit} 
              onUpload={onUpload}
            />
            </Box>
            
            <Box display="flex" flexDirection="row">
              {/* <Button onClick={getFileTree} /> */}
              {showCommit && <CommitUI />}
              {showFileTree && (
                <FileTree 
                  data={listFile}
                  // onFileSelect={handleFileSelect} 
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
          <Flex flexDirection="column" height="80%">
            <Box flex="1">
              {/* {currentFile && ( */}
                <Box bg="transparent">
                <EditorComponent 
                  // file={currentFile} 
                  // onContentChange={handleContentChange}
                  // content={fileContent}
                />
                </Box>

              {/* )} */}
            </Box>   
          </Flex>
          <Box bg="#dd631c">
              <Comment />
            </Box>
        </Box>
      </Flex>
    </Box>
      </ChakraProvider>
      
    );
  };
  
  export default App;

