import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Box>
      <Box>
        <Text
          fontWeight={"bold"}
          color={"blackAlpha.900"}
          marginBottom={"0.3rem"}
          paddingY="1rem"
        >
          Search
        </Text>
      </Box>
      <Divider />
      <form className="form-inline " onSubmit={handleSubmit}>
        <div className="col-12 py-3 ">
          <Box display={"flex"}>
            <input
              type="text"
              value={search}
              className="form-control search-input"
              placeholder="search blog..."
              onChange={handleChange}
            />
            <button className="btn btn-secondary search-btn">
              <BsSearch />
            </button>
          </Box>
        </div>
      </form>
    </Box>
  );
};

export default Search;
