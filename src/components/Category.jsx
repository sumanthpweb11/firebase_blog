import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ categoryCount }) => {
  return (
    <Box>
      <Box>
        <List
          width={"200px"}
          margin="0 auto"
          flexDirection={"column"}
          display={"flex"}
          gap="1rem"
        >
          {categoryCount?.map((item, index) => {
            return (
              <ListItem
                backgroundColor={"green.100"}
                _hover={{ backgroundColor: "green.200" }}
                paddingY="0.5rem"
                paddingX={"1rem"}
                rounded="0.5rem"
                cursor={"pointer"}
                key={index}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/category/${item.category}`}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text>{item.category}</Text>
                    <span>{item.count}</span>
                  </Flex>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Category;
