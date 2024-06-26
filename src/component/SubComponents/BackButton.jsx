import { Link, Button } from "@chakra-ui/react";

const BackButton = ({ id }) => {
  const handleBackClick = () => {
    window.location.href = `http://localhost/mod/gitlab/view.php?id=${id}`;
  };

  return (
    <Button
      ml="29px"
      mt="5px"
      variant="solid"
      // w="45px"
      h="20px"
      // color="black"
      backgroundColor="white"
      borderRadius="3px"
      border="0px"
      _hover={{
        bg: "#818181",
        textDecoration: "underline",
      }}
    >
      <Link onClick={handleBackClick} color="#ec5d0b" cursor="pointer">
        Back
      </Link>
    </Button>
  );
};

export default BackButton;
