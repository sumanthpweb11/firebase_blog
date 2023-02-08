import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RelatedBlog from "../components/RelatedBlog";
import UserComments from "../components/UserComments";
import { db } from "../firebase/firebase";
import "../App.css";
import CommentBox from "../components/CommentBox";
import { toast } from "react-toastify";
import Like from "../components/Like";
import SpinnerComponent from "../components/SpinnerComponent";

const Detail = ({ user, setNavLinksActive }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlogDetails = async () => {
      setLoading(true);
      const blogRef = collection(db, "blogs");
      const docRef = doc(db, "blogs", id);
      const blogdetail = await getDoc(docRef);
      setBlog(blogdetail.data());
      const relatedBlogsQuery = query(
        blogRef,
        where("tags", "array-contains-any", blogdetail.data().tags, limit(1))
      );
      setComments(blogdetail.data().comments ? blogdetail.data().comments : []);
      setLikes(blogdetail.data().likes ? blogdetail.data().likes : []);
      const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
      const relatedBlogs = [];
      relatedBlogSnapshot.forEach((doc) => {
        relatedBlogs.push({ id: doc.id, ...doc.data() });
      });

      setRelatedBlogs(relatedBlogs);
      setLoading(false);
    };
    id && getBlogDetails();
  }, [id]);

  console.log("relatedBlog", relatedBlogs);

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Comment posted Successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });

    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          // -1 means new user is like the post
          // -1 last index of array

          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }

      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 2 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={blog?.imgUrl}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {blog?.title}
              </Heading>
              <Text
                color={"gray.400"}
                fontWeight={300}
                fontSize={"2xl"}
                marginTop="0.3rem"
              >
                <span>Category:</span> {blog?.category}
              </Text>
              <Text>By {blog?.author}</Text>
            </Box>

            <Box>
              <Like handleLike={handleLike} likes={likes} userId={userId} />
            </Box>
          </Flex>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                color={"gray.600"}
                // borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                // color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {blog?.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.600"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                TAGS
              </Text>

              <Box>
                <List display={"flex"} gap="2rem">
                  {blog?.tags?.map((tag, index) => {
                    return (
                      <ListItem
                        backgroundColor={"green.100"}
                        _hover={{ backgroundColor: "green.200" }}
                        paddingY="0.5rem"
                        paddingX={"1rem"}
                        rounded="0.2rem"
                        cursor={"pointer"}
                        key={index}
                      >
                        {/* #{tag.toUpperCase()} */}
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/tag/${tag}`}
                        >
                          #{tag.toUpperCase()}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.600"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                {comments?.length} Comments
              </Text>

              <div className="custombox">
                <div className="scroll">
                  {isEmpty(comments) ? (
                    <>
                      <UserComments msg="No comments posted yet.Be the first to comment" />
                    </>
                  ) : (
                    <>
                      {comments?.map((comment) => {
                        return <UserComments {...comment} />;
                      })}
                    </>
                  )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Divider />
      <Flex gap={"1rem"}>
        <RelatedBlog id={id} blogs={relatedBlogs} />
      </Flex>
    </Container>
  );
};

export default Detail;
