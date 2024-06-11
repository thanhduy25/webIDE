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
        style={{
          backgroundColor: "transparent",
          fontSize: "25px",
          color: "white",
        }}
        border="0px"
        onClick={onClick}
      ></IconButton>
    </Tooltip>
  );
};

export default NavbarItem;
