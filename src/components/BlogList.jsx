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

const BlogList = ({ blogs, user, handleDelete }) => {
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
            Blogs
          </Text>
        </Center>
      </Box>
      <Divider marginTop={"1rem"} />
      {blogs?.map((item) => {
        return (
          <Center key={item.id} py={6}>
            <Stack
              // backgroundColor={"red.600"}
              borderWidth="1px"
              borderRadius="lg"
              minWidth={{ sm: "500px" }}
              maxWidth={{ sm: "600px" }}
              minHeight={{ sm: "476px" }}
              direction={{ base: "column", md: "row" }}
              // bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              padding={4}
            >
              <Flex flex={1} bg="blue.200">
                <Image objectFit="cover" boxSize="100%" src={item.imgUrl} />
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}
              >
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {item.title}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                  {item.author}
                </Text>
                <Badge
                  backgroundColor={"green.200"}
                  textAlign={"center"}
                  // color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  {item.category}
                </Badge>

                <Stack
                  align={"center"}
                  justify={"center"}
                  direction={"row"}
                  mt={6}
                >
                  {item?.tags?.map((tag, index) => {
                    return (
                      <Text
                        key={index}
                        px={2}
                        py={1}
                        // bg={useColorModeValue("gray.50", "gray.800")}
                        fontWeight={"400"}
                      >
                        <span>#</span> {tag}
                      </Text>
                    );
                  })}
                </Stack>
                <Divider color={"green.500"} />
                <Text
                  rounded={"0.5rem"}
                  padding={"0.5rem"}
                  backgroundColor={"yellow.100"}
                >
                  {excerpt(item.description, 120)} <span>...</span>
                </Text>

                <Stack
                  width={"100%"}
                  mt={"2rem"}
                  direction={"row"}
                  padding={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Button
                    flex={1}
                    fontSize={"sm"}
                    rounded={{ base: "none", md: "full" }}
                    _focus={{
                      bg: "gray.200",
                    }}
                  >
                    <Link to={`/detail/${item.id}`}>Read More</Link>
                  </Button>
                </Stack>

                {user?.uid && item.userId === user.uid && (
                  <Box>
                    <Flex
                      gap="1rem"
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Box _hover={{ color: "red" }}>
                        <BsTrash2Fill
                          onClick={() => handleDelete(item.id)}
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      </Box>

                      <Box _hover={{ color: "yellow.500" }}>
                        <Link to={`/update/${item.id}`}>
                          <AiOutlineEdit
                            size={20}
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                      </Box>
                    </Flex>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Center>
        );
      })}
    </Box>
  );
};

export default BlogList;
