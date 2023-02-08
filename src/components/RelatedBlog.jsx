import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { BsTrash2Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { excerpt } from "../utility";
import RelatedBlogsCard from "./RelatedBlogsCard";

const RelatedBlog = ({ blogs, id }) => {
  return (
    <Flex
      gap={"1rem"}
      margin="0 auto"
      justifyContent="center"
      alignItems={"center"}
      flexDirection={{ base: "column", sm: "row" }}
    >
      {blogs.length === 1 && (
        <Flex
          marginBottom={"5rem"}
          justifyContent={"center"}
          alignItems="center"
        >
          <Text fontSize={"3xl"}>
            Related Blogs not found with the current blog
          </Text>
        </Flex>
      )}
      {blogs
        ?.filter((blog) => blog.id !== id)
        .map((item) => {
          return <RelatedBlogsCard {...item} />;
        })}
    </Flex>
  );
};

export default RelatedBlog;
