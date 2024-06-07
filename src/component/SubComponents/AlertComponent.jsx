import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";

import React from "react";

import { useSelector } from "react-redux";

function AlertComponent({ onCancelClick, onDeleteClick }) {
  const toast = useToast();
  const { fileTarget } = useSelector((state) => state.tree);
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        isOpen={true}
        leastDestructiveRef={cancelRef}
        // onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody>
              Are you sure you want to delete
              <b>{" " + fileTarget.name}</b>?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancelClick}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDeleteClick,
                    toast({
                      position: "top",
                      title: "Deleted !",
                      description: "",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertComponent;
