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

  const handleWheel = (event) => {
    // Ngăn chặn hành động mặc định của sự kiện lăn chuột
    event.preventDefault();
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
      zIndex={"10"}
      color="black"
      width="45px"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={1}
      overflow={"auto"}
      onWheel={handleWheel}
    >
      <InputFile />
      <VStack paddingTop="29px" spacing={1}>
        {navbarItems.map(({ label, icon, onClick }, index) => (
          <NavbarItem key={index} label={label} icon={icon} onClick={onClick} />
        ))}
      </VStack>
    </Box>
  );
};

export default Navbar;
