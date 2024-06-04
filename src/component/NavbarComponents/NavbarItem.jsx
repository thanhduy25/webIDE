import React from 'react';
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
        style={{ color: "white" }}
        border="0px"
        onClick={onClick}
        _hover={{ backgroundColor: "#8b330a", stroke: "blue" }}
      ></IconButton>
    </Tooltip>
  );
};

export default NavbarItem;
