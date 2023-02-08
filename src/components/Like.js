import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Like = ({ handleLike, likes, userId }) => {
  const LikeStatus = () => {
    if (likes?.length > 0) {
      // user has laready liked the post
      return likes.find((id) => id === userId) ? (
        <>
          <AiFillLike /> {likes.length} {Like.length === "1" ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <AiOutlineLike /> {likes.length}{" "}
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <AiOutlineLike />
      </>
    );
  };

  return (
    <>
      <span
        onClick={!userId ? null : handleLike}
        //style={{ float: "left", cursor: "pointer", marginTop: "-7px" }}
      >
        {!userId ? (
          <Button
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="please login to like"
          >
            <LikeStatus />
          </Button>
        ) : (
          <Button type="button">
            <LikeStatus />
          </Button>
        )}
      </span>
    </>
  );
};

export default Like;
