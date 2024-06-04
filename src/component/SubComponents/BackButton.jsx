import { Link, Button } from "@chakra-ui/react";

const BackButton = ({ id }) => {
  const handleBackClick = () => {
    window.location.href = `http://localhost/mod/gitlab/view.php?id=${id}`;
  };

  return (
    <Button
      ml="39px"
      mt="5px"
      variant="solid"
      // w="45px"
      h="20px"
      backgroundColor="white"
      borderRadius="3px"
      border="0px"
      _hover={{
        bg: "#a0471e",
        color: "white"
      }}
    >

      <Link _hover={{
        bg: "#a0471e",
        color: "white"
      }} textDecorationLine="none" onClick={handleBackClick} color="#e25d20" cursor="pointer">
        Back
      </Link>
    </Button>
  );
};

export default BackButton;
