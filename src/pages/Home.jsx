import { Box, Button, Center, Divider, Flex, Text } from "@chakra-ui/react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BlogList from "../components/BlogList";
import Category from "../components/Category";
import MostPopular from "../components/MostPopular";
import Search from "../components/Search";
import SpinnerComponent from "../components/SpinnerComponent";
import Tags from "../components/Tags";
import { db } from "../firebase/firebase";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ navLinksActive, setNavLinksActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [search, setSearch] = useState("");
  const [trending, setTrending] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [hide, setHide] = useState(false);
  const location = useLocation();

  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("likes", "!=", []));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrending(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    setSearch("");
    const myBlogs = collection(db, "blogs");

    const unSub = onSnapshot(
      myBlogs,
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });

        const uniqueTag = [...new Set(tags)];
        setAllTags(uniqueTag);
        setTotalBlogs(list);
        // setBlogs(list);
        setLoading(false);
        setNavLinksActive(true);
      },
      (error) => {
        console.log(error);
      }
    );

    //getBlogFunc();

    return () => {
      unSub();
      getTrendingBlogs();
    };
  }, [setNavLinksActive, navLinksActive]);

  //  FETCH LOAD MORE

  const getBlogs = async () => {
    const blogRef = collection(db, "blogs");

    // Load more feature
    const firstFour = query(blogRef, orderBy("title"), limit(4));

    const docSnapshot = await getDocs(firstFour);

    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    // get last document in array
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  };

  useEffect(() => {
    getBlogs();
    setHide(false);
  }, [navLinksActive]);

  const updateState = (docSnapshot) => {
    // check if collection is empty so that we can hide
    // load more button and display message no more blogs
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const blogsData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs((blogs) => [...blogs, ...blogsData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } else {
      toast.info("No more Blogs to Display");
      setHide(true);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");

    // starAfter defines our entry point of query
    const nextFour = query(
      blogRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );

    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
    setLoading(false);
  };

  // useEffect(() => {
  //   const getBlogList = async () => {
  //     const myBlogs = collection(db, "blogs");

  //     try {
  //       const data = await getDocs(myBlogs);
  //       const filterdata = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setBlogs(filterdata);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getBlogList();
  // }, []);

  // if (loading) {
  //   return <SpinnerComponent />;
  // }

  console.log("blogs", blogs);

  // Search
  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
  }, [searchQuery]);

  const searchBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
    const searchTagQuery = query(
      blogRef,
      where("tags", "array-contains", searchQuery)
    );
    const titleSnapshot = await getDocs(searchTitleQuery);
    const tagSnapshot = await getDocs(searchTagQuery);
    let searchTitleBlogs = [];
    let searchTagBlogs = [];
    titleSnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });

    tagSnapshot.forEach((doc) => {
      searchTagBlogs.push({ id: doc.id, ...doc.data() });
    });
    const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
    setBlogs(combinedSearchBlogs);
    setHide(true);
    setNavLinksActive(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog Deleted Successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      getBlogs();
      setHide(false);
    }

    setSearch(value);
  };

  // Category Count
  //totalBlogs is an array of objects
  const counts = totalBlogs?.reduce((prevValue, currentVal) => {
    let name = currentVal.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    delete prevValue["undefined"];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  // console.log("categorycount", categoryCount);
  // console.log("counts", counts);
  // console.log("totalblogs", totalBlogs);
  return (
    <div className="container-fluid pb-4 pt-4 padding relative">
      {loading && (
        <Box
          width={"100%"}
          height="100%"
          backgroundColor={"red.500"}
          opacity="0.2"
        >
          <SpinnerComponent />
        </Box>
      )}
      <div className="container padding ">
        <div className="row mx-0 ">
          <div className="col-md-8">
            <Box>
              <Center>
                <Text
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                  color={"blackAlpha.900"}
                  // marginBottom={"1rem"}
                  // paddingY="1rem"
                >
                  Blogs
                </Text>
              </Center>
            </Box>
            <Divider marginTop={"1rem"} />
            {blogs?.map((blog) => {
              return (
                <BlogList
                  key={blog.id}
                  user={user}
                  handleDelete={handleDelete}
                  {...blog}
                />
              );
            })}

            <Center>
              {!hide && <Button onClick={fetchMore}>Load More</Button>}
            </Center>
            {blogs.length === 0 && location.pathname !== "/" && (
              <>
                <Box
                  fontSize={"3xl"}
                  fontWeight="bold"
                  marginTop={"1rem"}
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <Center>
                    <Box>
                      <Text>No Blogs Found With This Search </Text>
                      <Text textAlign={"center"} color={"orange.500"}>
                        {searchQuery}
                      </Text>
                    </Box>
                  </Center>
                </Box>
              </>
            )}
          </div>

          <div className="col-md-4 ">
            <Search search={search} handleChange={handleChange} />

            <Tags allTags={allTags} />
            <Divider marginTop={"1rem"} />
            <MostPopular blogs={trending} />
            <Category categoryCount={categoryCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
