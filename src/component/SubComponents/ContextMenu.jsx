import { Box, List } from "@chakra-ui/react";

import { ContextMenuItem } from "./index";

import { useSelector, useDispatch } from "react-redux";
import { closeContextMenu } from "../../store/contextMenuSlice";
import { openModal } from "../../store/modalSlice";

import { openAlertDialog } from "../../store/alertDialogSlice";
import { compose } from "@reduxjs/toolkit";

const ContextMenu = () => {
  const { fileTarget } = useSelector((state) => state.tree);
  const { xPos, yPos, isOpen } = useSelector((state) => state.contextMenu);

  const dispatch = useDispatch();

  const handleUpload = () => {
    document.getElementById("fileInput").click();
  };

  const sharedContextMenuItemList = [
    {
      name: "Rename",
      onClick: () => {
        dispatch(openModal({ type: fileTarget.type, action: "rename" }));
      },
    },
    {
      name: "Delete",
      onClick: () => {
        dispatch(openAlertDialog());
      },
    },
  ];

  const contextMenuItemListFolder = [
    {
      name: "New file",
      onClick: () => {
        dispatch(openModal({ type: "blob", action: "add" }));
      },
    },
    {
      name: "New folder",
      onClick: () => {
        dispatch(openModal({ type: "tree", action: "add" }));
      },
    },
    {
      name: "Upload file",
      onClick: handleUpload,
    },
  ];

  const contextMenuItemList = [...sharedContextMenuItemList];
  if (fileTarget.type !== "blob") {
    contextMenuItemList.unshift(...contextMenuItemListFolder);
  }
  const menuWidth = 200;
  const menuHeight = 200;

  const adjustedXPos =
    xPos + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : xPos;
  const adjustedYPos =
    yPos + menuHeight > window.innerHeight
      ? window.innerHeight - menuHeight
      : yPos;

  return (
    <>
      {isOpen && (
        <Box
          style={{
            position: "absolute",
            left: adjustedXPos,
            top: adjustedYPos,
            backgroundColor: "#e8e8e8",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            w: "80px",
            zIndex: 1000,
          }}
        >
          <List
            spacing={2}
            background={"white"}
            border={"0px"}
            borderColor={"black"}
          >
            {contextMenuItemList.map(({ name, onClick }, index) => (
              <ContextMenuItem
                key={index}
                onClick={() => {
                  dispatch(closeContextMenu());
                  onClick();
                }}
              >
                {name}
              </ContextMenuItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default ContextMenu;
