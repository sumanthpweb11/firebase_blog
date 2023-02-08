import { Box, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import BlogList from "./BlogList";
import SpinnerComponent from "./SpinnerComponent";

const TagBlog = () => {
  const [tagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();

  const getTagBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");

    const tagBlogQuery = query(blogRef, where("tags", "array-contains", tag));

    const docSnapshot = await getDocs(tagBlogQuery);
    let tagBlogs = [];
    docSnapshot.forEach((doc) => {
      tagBlogs.push({ id: doc.id, ...doc.data() });
    });

    setTagBlogs(tagBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getTagBlogs();
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <Box>
      <Box>
        <Center>
          <Text
            fontSize={"3xl"}
            fontWeight={"bold"}
            color={"blackAlpha.900"}
            // marginBottom={"1rem"}
            // paddingY="1rem"
          >
            <Box>
              <Text>Blogs Tagged With </Text>
              <Text textAlign={"center"} color={"orange.500"}>
                {tag.toLocaleUpperCase()}
              </Text>
            </Box>
          </Text>
        </Center>
      </Box>
      <Divider marginTop={"1rem"} />
      <Flex
        flexWrap={"wrap"}
        gap="1rem"
        justifyContent={"center"}
        alignItems="center"
      >
        {tagBlogs?.map((item) => {
          return <BlogList key={item.id} {...item} />;
        })}
      </Flex>
    </Box>
  );
};

export default TagBlog;
