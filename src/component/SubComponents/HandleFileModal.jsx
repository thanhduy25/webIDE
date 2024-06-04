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

import { useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";

import { handleAdd, handleRename } from "../../utilities";

const HandleFileModal = () => {
  const { treeDirectory, fileTarget } = useSelector((state) => state.tree);
  const { type, action } = useSelector((state) => state.modal);
  const [name, setName] = useState("");

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
            ref={inputRef}
            type="text"
            placeholder={`Enter ${type === "tree" ? "folder" : "file"} name`}
            onChange={(event) => setName(event.target.value)}
            defaultValue={action === "rename" ? fileTarget.name : ""}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              onCloseModal();
              action === "add"
                ? handleAdd(name, type, fileTarget, treeDirectory, dispatch)
                : handleRename(name, fileTarget, treeDirectory, dispatch);
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
