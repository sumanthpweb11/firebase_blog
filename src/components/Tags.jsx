import { Box, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

const Tags = ({ allTags }) => {
  return (
    <Box>
      <Box>
        <Text
          fontWeight={"bold"}
          color={"blackAlpha.900"}
          marginBottom={"1rem"}
          paddingY="1rem"
        >
          Tags
        </Text>
      </Box>
      <Box>
        <List flexWrap={"wrap"} display={"flex"} gap="2rem">
          {allTags?.map((tag, index) => {
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
  );
};

export default Tags;
