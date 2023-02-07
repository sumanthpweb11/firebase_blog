import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { MdLocalShipping } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebase";

const Detail = ({ setNavLinksActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlogDetails = async () => {
      const docRef = doc(db, "blogs", id);
      const blogdetail = await getDoc(docRef);
      setBlog(blogdetail.data());
    };
    id && getBlogDetails();
  }, [id]);

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
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {blog?.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              marginTop="0.3rem"
            >
              <span>Category:</span> {blog?.category}
            </Text>
            <Text>By {blog?.author}</Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {blog?.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
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
                        #{tag.toUpperCase()}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Between lugs:
                  </Text>{" "}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Bracelet:
                  </Text>{" "}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case:
                  </Text>{" "}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case diameter:
                  </Text>{" "}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Dial color:
                  </Text>{" "}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Crystal:
                  </Text>{" "}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Water resistance:
                  </Text>{" "}
                  5 bar (50 metres / 167 feet){" "}
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Detail;
