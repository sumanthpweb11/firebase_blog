import { Badge, Button, Flex } from "@chakra-ui/react";
import { GrPrevious, GrNext } from "react-icons/gr";
import "../App.css";

const Pagination = ({ currentPage, handlePageChange, noOfPages }) => {
  return (
    <div>
      <div className="row mx-0">
        <div className="col-12 text-center pb-4 pt-4 ">
          <Flex gap={"0.5rem"} justifyContent={"center"} alignItems="center">
            <button
              className="pag-btn"
              onClick={() => handlePageChange("Prev")}
              // display={"flex"}
              disabled={currentPage === 1}
            >
              <GrPrevious /> <span>Prev</span>
            </button>
            <Badge
              paddingY={"0.5rem"}
              paddingX="1rem"
              _hover={{ color: "green.600" }}
              color={"green.300"}
              cursor={"pointer"}
              className="btn-pagging"
            >
              {currentPage}
            </Badge>
            <button
              className="pag-btn"
              onClick={() => handlePageChange("Next")}
              // display={"flex"}
              disabled={currentPage === noOfPages}
            >
              <span>Next</span>
              <GrNext />
            </button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
