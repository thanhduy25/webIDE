import React from 'react';
import {Collapse, Box, Button, Stack, Textarea } from '@chakra-ui/react';
import { MdArrowDropDown } from "react-icons/md";
import { useDisclosure } from '@chakra-ui/react';

const Comment = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
        <Button onClick={onToggle} bg="#eeeeee"  border="0px" >
          <MdArrowDropDown />Comment
        </Button>
       <Collapse in={isOpen} animateOpacity>
        <Stack bg="#eeeeee" spacing="5px" height="130px">
          <Textarea
            backgroundColor="#eeeeee"
            placeholder="Enter comment..."
            resize="vertical"
            h="40px"
            w="200px"
            size="md"
            focusBorderColor="blue.500"
            borderRadius="5px"
            border="1px"
            borderColor="black"
            _hover={{ borderColor: "gray.300" }}
            mb={2}
            margin="5px"
          />
          <Box>
          <Button
            onClick={onToggle}
            colorScheme="blue"
            size="md"
            variant="solid"
            w="100px"
            color="white"
            backgroundColor="black"
            borderRadius="5px"
            border="0px"
            margin="5px"
          >
          Comment
          </Button>
          <Button
            onClick={onToggle}
            colorScheme="blue"
            size="md"
            variant="solid"
            w="50px"
            color="white"
            backgroundColor="black"
            borderRadius="5px"
            border="0px"
            margin="5px"
          >
            Back
          </Button>
          
          </Box>
          
        </Stack>
        </Collapse>
    </>
  );
}

export default Comment;
