import { Box, Flex, Text } from "@chakra-ui/react";
import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import Pagination from "../components/Pagination";
import SpinnerComponent from "../components/SpinnerComponent";
import { db } from "../firebase/firebase";

const Blogs = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPages, setNoOfPages] = useState(0);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const getBlogsData = async () => {
      setLoading(true);

      const blogRef = collection(db, "blogs");

      // const first = query(blogRef, orderBy("title"), limit(3));
      const myBlogsOnly = query(
        blogRef,
        where("userId", "==", user?.uid),
        limit(2)
      );

      const docSnanshot = await getDocs(myBlogsOnly);
      setBlogs(docSnanshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setCount(docSnanshot.size);
      setLastVisible(docSnanshot.docs[docSnanshot.docs.length - 1]);
      setLoading(false);
    };

    const getTotalUserBlogs = async () => {
      const blogRef = collection(db, "blogs");

      const myBlogsOnly = query(blogRef, where("userId", "==", user?.uid));
      const docSnapshot = await getDocs(myBlogsOnly);
      const totalBlogs = docSnapshot.size;
      const totalPage = Math.ceil(totalBlogs / 2);
      setNoOfPages(totalPage);
      // console.log("no of pages", totalPage);
      console.log("total blogs", totalBlogs);
    };

    getBlogsData();
    getTotalUserBlogs();
  }, [user?.uid]);

  const fetchNext = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const nextBlogsQuery = query(
      blogRef,
      where("userId", "==", user?.uid),
      startAfter(lastVisible),
      limit(2)
    );
    const nextBlogsSnapshot = await getDocs(nextBlogsQuery);
    setBlogs(
      nextBlogsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(nextBlogsSnapshot.size);
    setLastVisible(nextBlogsSnapshot.docs[nextBlogsSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const fetchPrev = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const end =
      noOfPages !== currentPage ? endAt(lastVisible) : endBefore(lastVisible);
    const limitData =
      noOfPages !== currentPage
        ? limit(2)
        : count <= 2 && noOfPages % 2 === 0
        ? limit(2)
        : limitToLast(2);
    const prevBlogsQuery = query(
      blogRef,
      where("userId", "==", user?.uid),
      end,
      limitData
    );
    const prevBlogsSnapshot = await getDocs(prevBlogsQuery);
    setBlogs(
      prevBlogsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(prevBlogsSnapshot.size);
    setLastVisible(prevBlogsSnapshot.docs[prevBlogsSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const handlePageChange = (value) => {
    if (value === "Next") {
      setCurrentPage((page) => page + 1);
      fetchNext();
    } else if (value === "Prev") {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Box>
        <Flex
          marginBottom={"1rem"}
          justifyContent={"center"}
          alignItems="center"
        >
          <Text fontSize={"3xl"}>
            Blogs created by User <strong> {user?.displayName}</strong>{" "}
          </Text>
        </Flex>
      </Box>
      <Flex
        gap={"1rem"}
        margin="0 auto"
        justifyContent="center"
        alignItems={"center"}
        flexDirection={{ base: "column", lg: "row" }}
        flexWrap="wrap"
      >
        {blogs?.map((blog) => {
          return (
            <Box key={blog.id}>
              <BlogList {...blog} />
            </Box>
          );
        })}
      </Flex>
      <Box>
        <Pagination
          currentPage={currentPage}
          noOfPages={noOfPages}
          handlePageChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default Blogs;
