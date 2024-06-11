import { Link, Button } from "@chakra-ui/react";
import { IoArrowBackCircle } from "react-icons/io5";

const BackButton = ({ id }) => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Button
      ml={"3px"}
      mt="7px"
      variant="solid"
      w="25px"
      h="25px"
      color="white"
      backgroundColor="transparent"
      borderRadius="3px"
      border="0px"
      _hover={{
        bg: "trasparent",
        textDecoration: "underline",
      }}
      fontSize={"35px"}
    >
      <Link
        _hover={{ color: "#813e14" }}
        onClick={handleBackClick}
        color="white"
        cursor="pointer"
      >
        <IoArrowBackCircle />
      </Link>
    </Button>
  );
};

export default BackButton;
