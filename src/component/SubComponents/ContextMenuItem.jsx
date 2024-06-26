import { Button, ListItem } from "@chakra-ui/react";

const ContextMenuItem = ({ onClick, children }) => {
  return (
    <ListItem>
      <Button
        bg="transparent"
        width={"100%"}
        borderRadius={"2px"}
        _hover={{ bg: "#e25a1b", color: "white" }}
        onClick={onClick}
      >
        {children}
      </Button>
    </ListItem>
  );
};

export default ContextMenuItem;
