import { Box, VStack } from "@chakra-ui/react";
import { FaFileUpload, FaFile, FaGitAlt } from "react-icons/fa";
import React from "react";
import { InputFile, NavbarItem } from "./NavbarComponents";

import { useDispatch } from "react-redux";
import { toggleFileTree, toggleCommit } from "../store/navbarSlide";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleUpload = () => {
    document.getElementById("fileInput").click();
  };

  const navbarItems = [
    {
      label: "Tree Directory",
      icon: <FaFile style={{ fontSize: "25px", color: "white" }} />,
      onClick: () => dispatch(toggleFileTree()),
    },
    {
      label: "Commit",
      icon: <FaGitAlt style={{ fontSize: "25px", color: "white" }} />,
      onClick: () => dispatch(toggleCommit()),
    },
    {
      label: "Upload",
      icon: <FaFileUpload style={{ fontSize: "25px", color: "white" }} />,
      onClick: handleUpload,
    },
  ];

  return (
    <Box
      color="black"
      width="30px"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={4}
    >
      <InputFile />
      <VStack spacing={2}>
        {navbarItems.map(({ label, icon, onClick }, index) => (
          <NavbarItem key={index} label={label} icon={icon} onClick={onClick} />
        ))}
      </VStack>
    </Box>
  );
};

export default Navbar;
