import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const SaveButton = () => {
  const toast = useToast();
  return (
    <Button
      mt="5px"
      color="#e25d20"
      colorScheme="blue"
      size="md"
      variant="solid"
      h="20px"
      backgroundColor="white"
      borderRadius="3px"
      border="0px"
      onClick={() =>
        toast({
          title: "Saved.",
          description: "File was saved!",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
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
