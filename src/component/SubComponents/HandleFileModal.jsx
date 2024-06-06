import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";

import { handleAdd, handleRename } from "../../utilities";

const HandleFileModal = () => {
  const { treeDirectoryFlatten, fileTarget } = useSelector(
    (state) => state.tree
  );

  const { type, action } = useSelector((state) => state.modal);

  const [name, setName] = useState(action == "rename" ? fileTarget.name : "");
  const [existName, setExistName] = useState(false);

  const inputRef = useCallback((node) => {
    if (node !== null) {
      if (fileTarget.type === "blob" && node.value.includes(".")) {
        const indexLastDot = node.value.lastIndexOf(".");
        node.setSelectionRange(indexLastDot, indexLastDot);
      }
    }
  }, []);

  const dispatch = useDispatch();
  const onCloseModal = () => dispatch(closeModal());

  return (
    <Modal isOpen={true} onClick={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Enter new {type === "tree" ? "folder" : "file"} name
        </ModalHeader>
        <ModalBody>
          <Input
            isInvalid={existName}
            ref={inputRef}
            type="text"
            placeholder={`Enter ${type === "tree" ? "folder" : "file"} name`}
            onChange={(event) => setName(event.target.value)}
            defaultValue={action === "rename" ? fileTarget.name : ""}
            errorBorderColor="red.300"
          />
          {existName && (
            <Alert status="error">
              <AlertIcon />
              This name already exists !
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (action === "add") {
                const addStatus = handleAdd(
                  name,
                  type,
                  fileTarget,
                  treeDirectoryFlatten,
                  dispatch
                );
                if (!addStatus) onCloseModal();
                setExistName(addStatus);
              } else {
                const renameStatus = handleRename(
                  name,
                  fileTarget,
                  treeDirectoryFlatten,
                  dispatch
                );
                if (!renameStatus) onCloseModal();
                setExistName(renameStatus);
              }
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HandleFileModal;
