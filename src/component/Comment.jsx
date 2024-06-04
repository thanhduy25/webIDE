import React from 'react';
import { Collapse, Box, Button, Stack, Flex, Textarea } from '@chakra-ui/react';
import { MdArrowDropDown } from "react-icons/md";
import { useDisclosure } from '@chakra-ui/react';

const Comment = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Button _hover={{
        bg: "#a0471e",
        color: "white"
      }} color="white" onClick={onToggle} bg="transparent" border="0px" >
        <MdArrowDropDown />Comment
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex spacing="5px" height="16vh">
          <Textarea
            backgroundColor="#eeeeee"
            placeholder="Enter comment..."
            resize="vertical"
            height="85px"
            w="200px"
            size="md"
            focusBorderColor="blue.500"
            borderRadius="5px"
            border="1px"
            borderColor="black"
            _hover={{ borderColor: "#a0471e" }}
            mb={2}
            margin="5px"
          />
          <Box>
            <Stack spacing={1}>
              <Button
                onClick={onToggle}
                colorScheme="blue"
                size="md"
                h="35px"
                variant="solid"
                w="100px"
                color="#f05a15"
                backgroundColor="white"
                borderRadius="5px"
                border="0px"
                margin="5px"
                _hover={{ backgroundColor: "#a0471e", color: "white" }}
              >
                Comment
              </Button>
              <Button
                onClick={onToggle}
                colorScheme="blue"
                size="md"
                variant="solid"
                w="100px"
                h="35px"
                color="#f05a15"
                backgroundColor="white"
                borderRadius="5px"
                border="0px"
                margin="5px"
                _hover={{ backgroundColor: "#a0471e", color: "white" }}
              >
                Back
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Collapse>
    </>
  );
}

export default Comment;

