import { Box, List } from "@chakra-ui/react";

import { ContextMenuItem } from "./index";

import { useSelector, useDispatch } from "react-redux";
import { closeContextMenu } from "../../store/contextMenuSlice";
import { openModal } from "../../store/modalSlice";

import { openAlertDialog } from "../../store/alertDialogSlice";

const ContextMenu = () => {
  const { fileTarget } = useSelector((state) => state.tree);
  const { xPos, yPos, isOpen } = useSelector((state) => state.contextMenu);

  const dispatch = useDispatch();

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
  ];

  const contextMenuItemList = [...sharedContextMenuItemList];
  if (fileTarget.type === "tree") {
    contextMenuItemList.unshift(...contextMenuItemListFolder);
  }

  return (
    <>
      {isOpen && (
        <Box
          style={{
            position: "absolute",
            left: xPos,
            top: yPos,
            backgroundColor: "#e8e8e8",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.7)",
            borderRadius: "0px",
            zIndex: 1000,
            width: "150px"
          }}
        >
          <List
            spacing={1}
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
