import { Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();

  return (
    <>
      <form className="row blog-form">
        <div className="col-12 py-3">
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="form-control description"
          />
        </div>
      </form>

      {!userId ? (
        <>
          <Text>Please login or create account to post message</Text>
          <Button onClick={() => navigate("/auth")}>Login</Button>
        </>
      ) : (
        <>
          <Center>
            <Button onClick={handleComment} type="submit">
              Post Comment
            </Button>
          </Center>
        </>
      )}
    </>
  );
};

export default CommentBox;
