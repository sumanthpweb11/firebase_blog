import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { Box } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: [],
};
const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const { title, tags, trending, category, description } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downnloadUrl) => {
            toast.info("Image upload complete");
            setForm((prev) => ({ ...prev, imgUrl: downnloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const getBlogDetailForUpdate = async () => {
      const docRef = doc(db, "blogs", id);

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setForm({ ...snapshot.data() });
        // setNavLinksActive(false);
      }
    };

    id && getBlogDetailForUpdate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            // timeStamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created Successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            // timeStamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated Successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("Fields cannot be empty");
    }

    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>

        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="tags"
                  onChange={handleTags}
                />
              </div>

              <div className="col-12 py-3">
                <p className="trending">Is it a trending blog?</p>
                <Box
                  display="flex"
                  gap="1rem"
                  className="form-check-inline mx-2"
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    name="radioOption"
                    value="yes"
                    onChange={handleTrending}
                    checked={trending === "yes"}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes{" "}
                  </label>

                  <input
                    type="radio"
                    className="form-check-input"
                    name="radioOption"
                    value="no"
                    onChange={handleTrending}
                    checked={trending === "no"}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </Box>
              </div>

              <Box width="100%" className="col-12 py-3 ">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown w-100"
                >
                  <option>Please Select Category</option>
                  {categoryOption.map((option, index) => {
                    return (
                      <option key={index} value={option || ""}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </Box>

              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  onChange={handleChange}
                  name="description"
                  placeholder="description"
                  value={description}
                />
              </div>

              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="col-12 py-3 text-center">
                <button
                  className="btn brn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
