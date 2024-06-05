import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Button } from "@chakra-ui/react";
import { removeFileOpening, setFileEditing } from "../../store/editorSlice";
import { CloseIcon } from "@chakra-ui/icons";

const TabsEditing = () => {
  const dispatch = useDispatch();
  const { listFileOpening } = useSelector((state) => state.editor);

  const handleRemoveTab = (event, path) => {
    event.stopPropagation();

    const lenList = Object.keys(listFileOpening).length;
    const lastItem = Object.keys(listFileOpening)[lenList - 2];

    dispatch(setFileEditing(listFileOpening[lastItem]));
    dispatch(removeFileOpening(path));
  };

  return (
    <Flex>
      {Object.keys(listFileOpening).length > 0 &&
        Object.entries(listFileOpening).map(([path, fileOpening]) => {
          return (
            <Button
              key={path}
              bgColor={"white"}
              onClick={() => {
                dispatch(setFileEditing(fileOpening));
              }}
              border={"1px"}
              borderColor={"gray"}
              borderRadius={"0"}
              _hover={{ bgColor: "white" }}
              paddingRight={"6px"}
            >
              {fileOpening.name}
              <Box
                marginLeft={"16px"}
                paddingX={"8px"}
                paddingY={"4px"}
                borderRadius={"4px"}
                _hover={{ cursor: "pointer", bgColor: "gray.300" }}
                zIndex={2}
                onClick={(event) => handleRemoveTab(event, path)}
              >
                <CloseIcon boxSize={"12px"} marginBottom={"3px"} />
              </Box>
            </Button>
          );
        })}
    </Flex>
  );
};

export default TabsEditing;
