import React, { useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { MdFolder, MdInsertDriveFile } from "react-icons/md";

import { useDispatch } from "react-redux";
import { openContextMenu } from "../store/contextMenuSlice";
import { changeFileTarget, changeFileEditing } from "../store/treeSlice";

const TreeItem = ({ item, onFileSelect, onFileUpload }) => {
  const dispatch = useDispatch();

  const isFolder = item.type === "tree";

  const [isOpenFolder, setIsOpenFolder] = useState(false);

  const handleToggleFolder = () => {
    setIsOpenFolder(!isOpenFolder);
  };

  const handleContextMenu = (event) => {
    console.log(item);
    event.preventDefault();
    event.stopPropagation();

    dispatch(openContextMenu({ xPos: event.clientX, yPos: event.clientY }));
    dispatch(changeFileTarget(item));

    if (isFolder) handleToggleFolder();
  };

  const handleFileSelect = () => {
    if (item.type === "blob") {
      dispatch(changeFileEditing(item));
    }
  };

  return (
    <Box onContextMenu={handleContextMenu}>
      <Flex
        width="100%"
        height="20px"
        alignItems="center"
        onClick={isFolder ? handleToggleFolder : handleFileSelect}
        margin="5px"
        _hover={{
          bg: "#ececec",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {isFolder ? (
          <Icon color="#e7722d" as={MdFolder} />
        ) : (
          <Icon color="#6ba5d8" as={MdInsertDriveFile} />
        )}
        <Text ml="3">{item.name}</Text>
      </Flex>
      {isOpenFolder && item.children && (
        <Box pl="10px" mt="5px">
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} onFileUpload={onFileUpload} onFileSelect={onFileSelect} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TreeItem;
