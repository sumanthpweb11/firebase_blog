import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      width={"700px"}
      height="400px"
      margin={"0 auto"}
      flexDirection="column"
      marginTop={"2rem"}
    >
      <Image
        objectFit="cover"
        boxSize="100%"
        src="/images/pagenotfound.jpg"
        alt="pagenotfound"
      />

      <Text fontSize={"3xl"} fontWeight={"bold"}>
        Sorry , This Page Does Not Exist
      </Text>
    </Box>
  );
};

export default NotFound;
