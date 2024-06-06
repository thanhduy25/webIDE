import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
} from "@chakra-ui/react";

import { useHotkeys } from "react-hotkeys-hook";

import { useState, useCallback, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";

import { handleAdd, handleRename } from "../../utilities";

const HandleFileModal = () => {
  const { treeDirectoryFlatten, fileTarget } = useSelector(
    (state) => state.tree
  );

  const { type, action } = useSelector((state) => state.modal);

  const [name, setName] = useState(action === "rename" ? fileTarget.name : "");

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

  const onConfirmAction = () => {
    onCloseModal();
    if (action === "add") {
      const addStatus = handleAdd(
        name,
        type,
        fileTarget,
        treeDirectoryFlatten,
        dispatch
      );
    } else {
      const renameStatus = handleRename(
        name,
        fileTarget,
        treeDirectoryFlatten,
        dispatch
      );
    }
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      onConfirmAction();
    }
  };

  return (
    <Modal isOpen={true} onClick={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Enter new {type === "tree" ? "folder" : "file"} name
        </ModalHeader>
        <ModalBody>
          <Input
            ref={inputRef}
            type="text"
            placeholder={`Enter ${type === "tree" ? "folder" : "file"} name`}
            onChange={(event) => setName(event.target.value)}
            defaultValue={action === "rename" ? fileTarget.name : ""}
            onKeyDown={handleEnterKeyDown}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={onConfirmAction}>
            {action === "add" ? "Create" : "Rename"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HandleFileModal;
