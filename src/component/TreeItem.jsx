import React, { useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { MdFolder, MdInsertDriveFile } from "react-icons/md";
import { handleFileSelected } from "../utilities";

import { useSelector, useDispatch } from "react-redux";
import { openContextMenu } from "../store/contextMenuSlice";
import { changeFileTarget } from "../store/treeSlice";

const TreeItem = ({ item }) => {
  const dispatch = useDispatch();

  const { projectId, branch } = useSelector((state) => state.globalData);
  const { treeDirectoryFlatten } = useSelector((state) => state.tree);

  const isFolder = item.type === "tree";

  const [isOpenFolder, setIsOpenFolder] = useState(false);

  const handleToggleFolder = () => {
    setIsOpenFolder(!isOpenFolder);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(openContextMenu({ xPos: event.clientX, yPos: event.clientY }));
    dispatch(changeFileTarget(item));

    if (isFolder) handleToggleFolder();
  };

  return (
    <Box onContextMenu={handleContextMenu}>
      <Flex
        width="100%"
        height="20px"
        alignItems="center"
        onClick={
          isFolder
            ? handleToggleFolder
            : () =>
                handleFileSelected(
                  projectId,
                  branch,
                  treeDirectoryFlatten,
                  item,
                  dispatch
                )
        }
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
          <Icon color="#dddddd" as={MdInsertDriveFile} />
        )}
        <Text ml="3">{item.name}</Text>
      </Flex>
      {isOpenFolder && item.children && (
        <Box pl="10px" mt="5px">
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TreeItem;
