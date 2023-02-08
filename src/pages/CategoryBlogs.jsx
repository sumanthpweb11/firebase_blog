import { Box, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogList from "../components/BlogList";
import SpinnerComponent from "../components/SpinnerComponent";
import { db } from "../firebase/firebase";

const CategoryBlogs = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCategoryBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");

    const categoryBlogQuery = query(blogRef, where("category", "==", category));

    const docSnapshot = await getDocs(categoryBlogQuery);
    let categoryBlogs = [];
    docSnapshot.forEach((doc) => {
      categoryBlogs.push({ id: doc.id, ...doc.data() });
    });

    setCategoryBlogs(categoryBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getCategoryBlogs();
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
              <Text>Category </Text>
              <Text textAlign={"center"} color={"orange.500"}>
                {category.toLocaleUpperCase()}
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
        {categoryBlogs?.map((item) => {
          return <BlogList key={item.id} {...item} />;
        })}
      </Flex>
    </Box>
  );
};

export default CategoryBlogs;
