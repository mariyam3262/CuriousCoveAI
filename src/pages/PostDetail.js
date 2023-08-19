import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ChatAI from "./ChatAI";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { generate, mycontent } = ChatAI();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts/" + id)
      .then((res) => setPost({ ...res.data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "30px",
          // border: "2px solid gray",
          boxSizing: "border-box",
          padding: "40px 20px",
          borderRadius: "15px",
          maxWidth: "500px",
          backgroundColor: "rgb(255 192 203 / 42%)",
        }}
      >
        <div
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          style={{
            fontSize: "30px",
            fontWeight: "400",
            marginBottom: "20px",
            textAlign: "center",
            textTransform: "capitalize",
            borderRadius: "5px",
            padding: "15px",
            backgroundColor: hover && "rgb(223, 166, 166)",
          }}
        >
          <Link to={`/blogsDetails/${id}`} style={{ textDecoration: "none" }}>
            {post.author}
          </Link>
        </div>

        <div
          style={{
            margin: "5px",
            fontSize: "25px",
            fontWeight: "400",
          }}
        >
          {post.title}
        </div>

        <p
          style={{
            // fontSize: "20px",
            height:'170px',
            overflow:'auto'
          }}
        >
          {post.post}
        </p>

        <button
          style={{
            borderRadius: "4px",
            fontSize: "17px",
            margin: "5px",
            backgroundColor: "bisque",
            color:'#4e0e0ec2',
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          style={{
            borderRadius: "4px",
            fontSize: "17px",
            margin: "5px",
            backgroundColor: "bisque",
            color:'#4e0e0ec2',
          }}
          onClick={() => generate(`give me very brief idea about this post including text tone and the information it provided in it. \n The post is : ${post.post}`)}
        >
          Review with ai
        </button>
      </div>
      {mycontent.data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "30px",
            // border: "2px solid gray",
            boxSizing: "border-box",
            padding: "45px 25px",
            borderRadius: "15px",
            maxWidth: "500px",
            backgroundColor: "rgb(255 192 203 / 42%)",
          }}
        >
          <p>Review of post : {post.title}</p>
          <div>{mycontent.data.split(".").map(line => <p>{line}</p>)}</div>
          <button
            style={{
              borderRadius: "4px",
              fontSize: "17px",
              marginTop: "15px",
              backgroundColor: "bisque",
              color:'#4e0e0ec2',
            }}
            onClick={() => navigate("chatAsst")}
          >
            prompt page
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
