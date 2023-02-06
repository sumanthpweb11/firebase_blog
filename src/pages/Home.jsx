import { async } from "@firebase/util";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [snapShot, setSnapshot] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const myBlogs = collection(db, "blogs");

    const unSub = onSnapshot(
      myBlogs,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
      },
      (error) => {
        console.log(error);
      }
    );

    //getBlogFunc();

    return () => {
      unSub();
    };
  }, []);

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

  console.log("blogs", blogs);
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <h2>Trending</h2>
          <div className="col-md-8">
            <h2>Blog Section</h2>
          </div>

          <div className="col-md-3">
            <h2>Tags</h2>
            <h2>Most Popular</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
