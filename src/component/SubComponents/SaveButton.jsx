import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const SaveButton = ({ onClick }) => {
  const toast = useToast();
  return (
    <Button
      mr={"8px"}
      mt="7px"
      color="#e25d20"
      colorScheme="blue"
      size="md"
      variant="solid"
      h="25px"
      backgroundColor="white"
      borderRadius="3px"
      border="0px"
      onClick={() => {
        onClick();
        toast({
          title: "Saved.",
          description: "File was saved!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }}
      _hover={{
        bg: "#a0471e",
        color: "white",
      }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
