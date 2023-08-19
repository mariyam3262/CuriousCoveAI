import React, { useContext, useEffect } from "react";
import ChatAI from "./ChatAI";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthRoute";

function SubMessage() {
  const { currentUser } = useContext(AuthContext);
  const { mycontent, generate } = ChatAI();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        const authPosts = res.data.filter(
          (post) => post.author === currentUser
        );
        console.log(authPosts)
        generate(
          `generate pleasant 3-4 line message  for post " ${authPosts[authPosts.length - 1].post } " for user's efforts and quality of blog post along with some emoji icons`
        );
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  return (
    <div
      style={{
        display: "flex",
        padding: "30px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          paddingTop: "30px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "400px",
          backgroundColor: "rgb(255 192 203 / 42%)",
          padding: "40px",
          borderRadius: "15px",
          lineHeight:'30px'
        }}
      >
        {mycontent.data}

        <button
          style={{
            borderRadius: "4px",
            fontSize: "17px",
            marginTop: "15px",
            backgroundColor: "bisque",
            color: "#4e0e0ec2",
            margin: "10px",
          }}
          onClick={() => navigate("/blogs")}
        >
          Post
        </button>
      </div>{" "}
      <br />
    </div>
  );
}

export default SubMessage;
