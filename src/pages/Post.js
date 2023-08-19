import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthRoute";
import useBlogs from "./BlogsData";
import { useNavigate } from "react-router-dom";
import ChatAI from "./ChatAI";

const Post = () => {
  const { postData } = useBlogs();
  const { currentUser } = useContext(AuthContext);
  const initialValues = { title: "", post: "" };
  const [post, setPost] = useState(initialValues);
  const navigate = useNavigate();

  const [copyFlage, setCopyFlage] = useState(false);
  const { mycontent, generate, stop } = ChatAI();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            // border: "2px solid gray",
            backgroundColor: "rgb(255 192 203 / 42%)",
            width: "280px",
            padding: "5px 80px 15px 80px",
            borderRadius: "15px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postData({ ...post, author: currentUser });
              setPost(initialValues);
              navigate("/sub-mess");
            }}
          >
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "400",
                  margin: "30px 10px",
                  textAlign: "center",
                }}
              >
                Hey {currentUser} ..!!
              </div>
              <label
                style={{
                  fontSize: "25px",
                  fontWeight: "50",
                }}
              >
                Title :{" "}
                <input
                  type="text"
                  value={post.title}
                  required
                  autoFocus
                  style={{
                    height: "32px",
                    borderRadius: "5px",
                    // overflow: "auto",
                    width: "390px",
                  }}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label
                style={{
                  fontSize: "25px",
                  fontWeight: "50",
                }}
              >
                Post :{" "}
                <textarea
                  type="text"
                  value={post.post}
                  required
                  cols="50"
                  rows="10"
                  onChange={(e) => setPost({ ...post, post: e.target.value })}
                ></textarea>
              </label>
            </div>
            <button
              style={{
                borderRadius: "4px",
                fontSize: "17px",
                margin: "5px",
                backgroundColor: "bisque",
                color:'#4e0e0ec2',
              }}
              type="submit"
            >
              Post
            </button>
          </form>
          <div>
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
              onClick={() =>
                generate(
                  `The post is : "${post.post}". \nHow can i enhace above post in most interesting and more informative way.\n AND also suggest 2 to 3 title for the post`
                )
              }
            >
              Enhance by AI
            </button>
          </div>
        </div>
      }
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
          <div
            style={{
              fontSize: "30px",
              padding: "5px",
            }}
          >
            Enhanced post{" "}
          </div>
          <div
            style={{
              overflow: "auto",
              height: "300px",
            }}
          >
            {mycontent.data.matchAll(/[0-9]\./g)
              ? mycontent.data.split(/[0-9]\./).map(
                  (line, i) =>
                    line !== "" && (
                      <pb key={i}>
                        {i}. {line}
                      </pb>
                    )
                )
              : mycontent.data}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <button
              style={{
                borderRadius: "4px",
                fontSize: "17px",
                marginTop: "15px",
                backgroundColor: "bisque",
                color:'#4e0e0ec2',
                margin: "10px",
              }}
              onClick={() =>
                setPost({ title: post.title, post: mycontent.data })
              }
            >
              Add
            </button>

            <button
              style={{
                borderRadius: "4px",
                fontSize: "17px",
                marginTop: "15px",
                backgroundColor: "bisque",
                color:'#4e0e0ec2',
                margin: "10px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(mycontent.data).then(
                  function () {
                    setCopyFlage(true);
                  },
                  function () {
                    alert("Failed to copy text to clipboard.");
                  }
                );
              }}
            >
              {copyFlage ? "copied " : "copy"}
            </button>

            <button
              style={{
                borderRadius: "4px",
                fontSize: "17px",
                marginTop: "15px",
                backgroundColor: "bisque",
                color: "#4e0e0ec2",
                margin: "10px",
              }}
              onClick={() => stop()}
            >
              stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
