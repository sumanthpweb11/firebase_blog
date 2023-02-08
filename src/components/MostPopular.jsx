import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const MostPopular = ({ blogs, title }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Center>
        <Text>Trending</Text>
      </Center>
      {blogs?.map((item) => {
        return (
          <Center
            onClick={() => navigate(`/detail/${item.id}`)}
            cursor={"pointer"}
            key={item.id}
            py={6}
          >
            <Stack
              // backgroundColor={"red.600"}
              borderWidth="1px"
              borderRadius="lg"
              minWidth={{ sm: "100px" }}
              maxWidth={{ sm: "200px" }}
              minHeight={{ sm: "176px" }}
              // maxHeight={{ sm: "250px" }}
              direction={{ base: "column" }}
              // bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              justifyContent="center"
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
                <Heading fontSize={"sm"} fontFamily={"body"}>
                  {item.title}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                  {item.author}
                </Text>
              </Stack>
            </Stack>
          </Center>
        );
      })}
    </Box>
  );
};

export default MostPopular;
