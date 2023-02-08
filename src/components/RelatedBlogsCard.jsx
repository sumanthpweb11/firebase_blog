import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { FaRegCommentDots } from "react-icons/fa";

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { BsTrash2Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const RelatedBlogsCard = ({
  title,
  description,
  imgUrl,
  id,
  likes,
  comments,
}) => {
  return (
    <Box>
      <Flex key={id} py={6}>
        <Stack
          // backgroundColor={"red.600"}
          borderWidth="1px"
          borderRadius="lg"
          minWidth={{ sm: "200px" }}
          maxWidth={{ sm: "300px" }}
          minHeight={{ sm: "200px" }}
          maxHeight={{ sm: "300px" }}
          direction={{ base: "column" }}
          // bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Box width={"100%"} height="100px" bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={imgUrl} />
          </Box>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={{ base: "lg" }} fontFamily={"body"}>
              {title}
            </Heading>
            <Badge paddingX={"1rem"} paddingY="0.5rem">
              <Flex gap="0.5rem" alignItems={"center"}>
                {likes?.length}
                <span>{likes?.length === 1 ? "Like" : "Likes"}</span>
              </Flex>
              {comments?.length > 0 && (
                <>
                  <Flex gap="0.5rem" alignItems={"center"}>
                    {comments?.length}
                    <FaRegCommentDots />
                  </Flex>
                </>
              )}
            </Badge>

            <Divider color={"green.500"} />
            <Text
              rounded={"0.5rem"}
              padding={"0.5rem"}
              backgroundColor={"yellow.100"}
            >
              {excerpt(description, 120)} <span>...</span>
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={{ base: "none", md: "full" }}
                _focus={{
                  bg: "gray.200",
                }}
              >
                <Link to={`/detail/${id}`}>Read More</Link>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default RelatedBlogsCard;
