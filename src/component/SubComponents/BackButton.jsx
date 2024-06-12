import { Link, Button } from "@chakra-ui/react";
import { IoArrowBackCircle } from "react-icons/io5";

const BackButton = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Button
      ml="3px"
      mt="3px"
      variant="solid"
      w="25px"
      h="25px"
      color="white"
      backgroundColor="transparent"
      borderRadius="3px"
      border="1px"
      _hover={{
        bg: "white",
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
