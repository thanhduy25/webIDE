import React, { useEffect, useState } from "react";
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
import axios from "axios";

import { useSelector } from "react-redux";

const Comment = ({ isContentShow }) => {
  const { isOpen, onToggle } = useDisclosure();

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isFocused, setIsFocused] = useState("");
  const [isSeeMore, setIsSeeMore] = useState(false);

  const { projectId, branch, userRole } = useSelector(
    (state) => state.globalData
  );

  const handleComment = async () => {
    const response = await axios.post(
      import.meta.env.VITE_ORIGIN +
        "/mod/gitlab/api/index.php/repository/comments",
      {
        project_id: projectId,
        sha: branch,
        note: comment,
      }
    );
    setCommentList([response.data.data, ...commentList]);
  };

  const handleDate = (date) => {
    const commitDate = new Date(date);
    const currentDate = new Date();

    const diffTime = Math.abs(currentDate - commitDate);
    const secondDiff = Math.floor(diffTime / 1000);
    if (secondDiff < 60) {
      if (secondDiff < 10) return "just now";

      return `${secondDiff} seconds ago`;
    }

    const minuteDiff = Math.floor(secondDiff / 60);
    if (minuteDiff < 60) return `${minuteDiff} minutes ago`;

    const hourDiff = Math.floor(minuteDiff / 60);
    if (hourDiff < 24) return `${hourDiff} hours ago`;

    const dayDiff = Math.floor(hourDiff / 24);
    if (dayDiff < 30) return `${dayDiff} days ago`;

    const weekDiff = Math.floor(dayDiff / 7);
    if (weekDiff < 4) return `${weekDiff} weeks ago`;

    const monthDiff = Math.floor(dayDiff / 30);
    if (monthDiff < 12) return `${monthDiff} months ago`;
  };

  useEffect(() => {
    if (!projectId || !branch) return;

    const getLastCommit = async () => {
      const response = await axios.get(
        import.meta.env.VITE_ORIGIN +
          `/mod/gitlab/api/index.php/repository/branches?project_id=${projectId}&branch=${branch}`
      );
      return response.data.data.commit;
    };

    const getComments = async (commit) => {
      const response = await axios.get(
        import.meta.env.VITE_ORIGIN +
          `/mod/gitlab/api/index.php/repository/comments?project_id=${projectId}&sha=${commit.id}`
      );

      if (response.data.data) {
        const sortByTimeDesc = response.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setCommentList(sortByTimeDesc);
      }
    };

    let lastCommit = null;

    getLastCommit().then((data) => {
      lastCommit = data;
      getComments(lastCommit);
    });
  }, [projectId, branch]);

  const listDisplay = isSeeMore ? commentList : commentList.slice(0, 5);

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
        {isOpen ? <MdArrowDropDown /> : <MdArrowDropUp />}
        Comment
      </Button>
      <Collapse in={isOpen} animateOpacity style={{ maxHeight: "none" }}>
        <Flex
          spacing="5px"
          paddingLeft={"8px"}
          paddingRight={"20px"}
          direction={"column"}
        >
          {(userRole === "Teacher" || userRole === null) && (
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
          )}
          {(isFocused || comment) && (
            <Box>
              <Flex spacing={1}>
                <Button
                  onClick={handleComment}
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
          {listDisplay.length &&
            listDisplay.map((cmt, index) => (
              <Card key={index}>
                <CardHeader
                  paddingX="16px"
                  paddingTop="16px"
                  paddingBottom="8px"
                >
                  <Heading size="sm">
                    <Flex w="100%" justifyContent="space-between">
                      <Flex alignItems="center">
                        <Text>{cmt.author.name}</Text>
                        <Text marginLeft="8px"> -</Text>
                        <Text
                          marginLeft="8px"
                          fontWeight={"normal"}
                          color="gray"
                        >
                          {handleDate(cmt.created_at)}
                        </Text>
                      </Flex>
                    </Flex>
                  </Heading>
                </CardHeader>
                <CardBody paddingX="16px" paddingTop="0" paddingBottom="8px">
                  {cmt.note}
                </CardBody>
              </Card>
            ))}
          {commentList.length > 5 && (
            <Button
              bgColor="transparent"
              width="fit-content"
              color="white"
              marginX="auto"
              _hover={{
                textDecor: "underline",
              }}
              _focus={{
                bgColor: "transparent",
              }}
              onClick={() => setIsSeeMore(!isSeeMore)}
            >
              {!isSeeMore ? "See all" : "Less comment"}
            </Button>
          )}
        </Stack>
      </Collapse>
    </>
  );
};

export default Comment;
