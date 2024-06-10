import React, { useState } from "react";
import {
  Collapse,
  Box,
  Button,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";

const Comment = ({ isContentShow }) => {
  const { isOpen, onToggle } = useDisclosure();

  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState("");

  const cmtList = [
    {
      name: "Teacher",
      time: "Yesterday",
      comment: "This is a comment",
    },
    {
      name: "Teacher",
      time: "Today",
      comment: "This is a comment",
    },
    {
      name: "Teacher",
      time: "Last week",
      comment: "This is a comment",
    },
  ];

  return (
    <>
      <Button
        _hover={{
          bg: "#a0471e",
          color: "white",
        }}
        color="white"
        onClick={onToggle}
        bg="transparent"
        border="0px"
        translateX={isContentShow ? "45px" : "100%"}
      >
        {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
        Comment
      </Button>
      <Collapse in={isOpen} animateOpacity style={{ maxHeight: "none" }}>
        <Flex
          spacing="5px"
          paddingLeft={"8px"}
          paddingRight={"20px"}
          direction={"column"}
        >
          <Textarea
            backgroundColor="#eeeeee"
            placeholder="Enter comment..."
            height="85px"
            w="100%"
            size="lg"
            focusBorderColor="blue.500"
            borderRadius="5px"
            border="1px"
            borderColor="black"
            _hover={{ borderColor: "#a0471e" }}
            mb={2}
            margin="5px"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {(isFocused || comment) && (
            <Box>
              <Flex spacing={1}>
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
                  Cancel
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
        <Stack paddingX={"16px"} spacing="2" mt="16px">
          {cmtList.map((cmt, index) => (
            <Card key={index}>
              <CardHeader paddingX="16px" paddingTop="16px" paddingBottom="8px">
                <Heading size="sm">
                  <Flex alignItems="center">
                    <Text>{cmt.name}</Text>
                    <Text marginLeft="8px"> -</Text>
                    <Text marginLeft="8px" fontWeight={"normal"} color="gray">
                      {cmt.time}
                    </Text>
                  </Flex>
                </Heading>
              </CardHeader>
              <CardBody paddingX="16px" paddingTop="0" paddingBottom="8px">
                {cmt.comment}
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Collapse>
    </>
  );
};

export default Comment;
