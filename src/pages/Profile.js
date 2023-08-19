import React, { useContext } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthRoute";
import useProfile from "./ProfileData";

const Profile = () => {
  const { id } = useParams();
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { users, post, allPost } = useProfile(id);

  return (
    post !== undefined &&
    users.length > 0 &&
    allPost.length > 0 &&
    (localStorage.getItem(post.author) === "true" &&
    currentUser === post.author ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // border: "1px solid gray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid gray",
            justifyContent: "space-between",
            padding: "20px 35px",
            borderRadius: "10px",
            width: "500px",
            backgroundColor: "#f5ebeba8",
          }}
        >
          <div>
            <div
              style={{
                margin: "5px",
                fontSize: "25px",
                fontWeight: "400",
              }}
            >
              Name : {users.find((user) => user.username === post.author).name}
            </div>
            <div
              style={{
                margin: "5px",
                fontSize: "25px",
                fontWeight: "400",
              }}
            >
              Username : {post.author}
            </div>
            <div
              style={{
                margin: "5px",
                fontSize: "25px",
                fontWeight: "400",
              }}
            >
              Email :{" "}
              {users.find((user) => user.username === post.author).email}
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  margin: "5px",
                  fontSize: "25px",
                  fontWeight: "400",
                  padding: "15px",
                }}
              >
                Posts{" "}
              </div>
              <div>
                <button
                  style={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    marginRight: "5px",
                    fontSize: "15px",
                    backgroundColor: "rgb(225, 180, 180)",
                    padding: "4px",
                  }}
                  onClick={() => navigate("/blogs")}
                >
                  Go back
                </button>
                <button
                  style={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    marginLeft: "5px",
                    fontSize: "15px",
                    backgroundColor: "rgb(225, 180, 180)",
                    padding: "4px",
                  }}
                  onClick={() => {
                    logout(post.auther);
                    navigate("/");
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
            <div
              style={{
                border: "1px solid gray",
                height: "245px",
                overflow: "auto",
                padding: "10px 10px",
                borderRadius: "15px",
                backgroundColor: "rgb(233 224 224)",
                width: "450px",
              }}
            >
              {allPost
                .filter((selectedPost) => selectedPost.author === post.author)
                .map((post) => (
                  <div
                    style={{
                      // border:'1px solid gray',
                      margin: "10px",
                      borderRadius: "10px",
                      backgroundColor: "rgb(225 180 180)",
                      padding: "15px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "50",
                      }}
                    >
                      {post.title}
                    </div>
                    <p>{post.post}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // border: "1px solid gray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid gray",
            justifyContent: "space-between",
            padding: "20px 35px",
            borderRadius: "10px",
            width: "500px",
            backgroundColor: "#f5ebeba8",
          }}
        >
          <div>
            <div
              style={{
                margin: "5px",
                fontSize: "25px",
                fontWeight: "400",
              }}
            >
              Name : {users.find((user) => user.username === post.author).name}
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  margin: "5px",
                  fontSize: "25px",
                  fontWeight: "400",
                  padding: "15px",
                }}
              >
                Posts{" "}
              </div>
              <div>
                <button
                  style={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    marginRight: "5px",
                    fontSize: "15px",
                    backgroundColor: "rgb(225, 180, 180)",
                    padding: "4px",
                  }}
                  onClick={() => navigate("/blogs")}
                >
                  Go back
                </button>
                
              </div>
            </div>
            <div
              style={{
                border: "1px solid gray",
                height: "245px",
                overflow: "auto",
                padding: "10px 10px",
                borderRadius: "15px",
                backgroundColor: "rgb(233 224 224)",
                width: "450px",
              }}
            >
              {allPost
                .filter((selectedPost) => selectedPost.author === post.author)
                .map((post) => (
                  <div
                    style={{
                      // border:'1px solid gray',
                      margin: "10px",
                      borderRadius: "10px",
                      backgroundColor: "rgb(225 180 180)",
                      padding: "15px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "50",
                      }}
                    >
                      {post.title}
                    </div>
                    <p>{post.post}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default Profile;
