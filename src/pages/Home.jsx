import { Box, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogList from "../components/BlogList";
import BlogSection from "../components/BlogSection";
import MostPopular from "../components/MostPopular";
import SpinnerComponent from "../components/SpinnerComponent";
import Tags from "../components/Tags";
import { db } from "../firebase/firebase";

const Home = ({ setNavLinksActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [snapShot, setSnapshot] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [trending, setTrending] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrending(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
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
        setBlogs(list);
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
  }, [setNavLinksActive]);

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
            {/* <BlogSection blogs={blogs} /> */}
            <BlogList blogs={blogs} user={user} handleDelete={handleDelete} />
          </div>

          <div className="col-md-4 ">
            <Tags allTags={allTags} />
            <Divider marginTop={"1rem"} />
            <MostPopular blogs={trending} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
