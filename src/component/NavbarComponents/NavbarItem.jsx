import { IconButton, Tooltip } from "@chakra-ui/react";

const NavbarItem = ({ label, icon, onClick }) => {
  return (
    <Tooltip
      fontSize="15px"
      backgroundColor="black"
      color="white"
      label={label}
      aria-label={label}
      placement="bottom"
    >
      <IconButton
        icon={icon}
        variant="ghost"
        colorScheme="whiteAlpha"
        style={{ backgroundColor: "transparent" }}
        border="0px"
        onClick={onClick}
        _hover={{ color: "#1a5292", stroke: "blue" }}
      ></IconButton>
    </Tooltip>
  );
};

export default NavbarItem;
