import { Button, ListItem } from "@chakra-ui/react";

const ContextMenuItem = ({ onClick, children }) => {
  return (
    <ListItem textAlign={"left"}>
      <Button
        h="30px"
        bg="transparent"
        width={"100%"}
        borderRadius={"2px"}
        _hover={{ bg: "#e25a1b", color: "white" }}
        color="black"
        onClick={onClick}
      >
        {children}
      </Button>
    </ListItem>
  );
};

export default ContextMenuItem;
