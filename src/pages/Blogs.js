import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBlogs from "./BlogsData";
import { AuthContext } from "./AuthRoute";

const Blogs = () => {
  const { BLOGS, deletePost } = useBlogs();

  const [serchedString, setSerchedString] = useState("");
  const [filterdPOsts, setFilteredPosts] = useState([...BLOGS]);

  const { currentUser } = useContext(AuthContext);

  const handleFilterPosts = () => {
    console.log(serchedString);

    serchedString !== ""
      ? setFilteredPosts(
          BLOGS.filter((post) =>
            post.title.toString().toLowerCase().match(serchedString)
          )
        )
      : setFilteredPosts([...BLOGS]);
  };

  useEffect(() => {
    handleFilterPosts();
  }, [serchedString]);

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              borderRadius: "4px",
              fontSize: "20px",
              margin: "5px",
              backgroundColor: "bisque",
              color: "#4e0e0ec2",
              border: "none",
              padding: "8px",
            }}
          >
            <Link
              to="post"
              style={{ textDecoration: "none", color: "#4e0e0ec2" }}
            >
              Add Post
            </Link>
          </button>
          <input
            type="text"
            value={serchedString}
            placeholder="  Search by Title"
            style={{
              backgroundColor: "rgb(211 211 211 / 46%)",
              width: "300px",
              border: "none",
              borderRadius: "8px",
            }}
            onChange={(e) => setSerchedString(e.target.value)}
          />
        </div>

        {filterdPOsts.length > 0
          ? [...filterdPOsts]
              .sort((a, b) => new Date(b.id) - new Date(a.id))
              .map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "10px",
                    // width:'100%',
                    margin: "10px",
                    // flexWrap: "wrap",
                    // backgroundColor:'#e7d5d899'
                    backgroundColor: "#d3d3d375",
                  }}
                >
                  <div
                    style={{
                      margin: "10px",
                      width: "33%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                        // width:'100%'
                      }}
                    >
                      {user.title}
                    </div>
                    <em style={{ fontSize: "15px" }}>
                      {user.date} {user.time}
                    </em>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontSize: "17px",
                      textTransform: "capitalize",
                      width: "33%",
                    }}
                  >
                    <p>{user.post.slice(0, 50)} ...</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      // flexWrap: "wrap",
                      width: "33%",
                    }}
                  >
                    <button
                      style={{
                        height: "auto",
                        fontSize: "17px",
                        margin: "5px",
                        border: "1px solid black",
                        borderRadius: "4px",
                        backgroundColor: "bisque",
                        // color: "#4e0e0ec2",
                      }}
                    >
                      <Link
                        to={`post/${user.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#4e0e0ec2",
                        }}
                      >
                        show
                      </Link>
                    </button>
                    {user.author == currentUser && (
                      <>
                        <button
                          style={{
                            height: "auto",

                            fontSize: "17px",
                            margin: "5px",
                            backgroundColor: "#dfa6a6",
                            border: "1px solid black",
                            borderRadius: "4px",
                            color: "#4e0e0ec2",
                          }}
                          onClick={() => deletePost(user.id)}
                        >
                          Delete
                        </button>
                        <button
                          style={{
                            height: "auto",
                            fontSize: "17px",
                            margin: "5px",
                            backgroundColor: "bisque",
                            // color: "#4e0e0ec2",
                            border: "1px solid black",
                            borderRadius: "4px",
                          }}
                        >
                          <Link
                            to={`post/${user.id}/update`}
                            style={{
                              textDecoration: "none",
                              color: "#4e0e0ec2",
                            }}
                          >
                            Update
                          </Link>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
          : [...BLOGS]
              .sort((a, b) => new Date(b.id) - new Date(a.id))
              .map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "10px",
                    margin: "10px",
                    // flexWrap: "wrap",
                    // backgroundColor:'#e7d5d899'
                    backgroundColor: "#d3d3d375",
                  }}
                >
                  <div
                    style={{
                      margin: "10px",
                      width: "33%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                      }}
                    >
                      {user.title}
                    </div>
                    <em style={{ fontSize: "15px" }}>
                      {user.date} {user.time}
                    </em>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      fontSize: "17px",
                      // fontWeight: "bold",
                      textTransform: "capitalize",
                      width: "33%",
                    }}
                  >
                    <p
                      style={{
                        textTransform: "capitalize",
                        width: "auto",
                      }}
                    >
                      {user.post.slice(0, 50)}...
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      // flexWrap: "wrap",
                      width: "33%",
                    }}
                  >
                    <button
                      style={{
                        height: "auto",
                        fontSize: "17px",
                        margin: "5px",
                        border: "1px solid black",
                        borderRadius: "4px",
                        backgroundColor: "bisque",
                        color: "#4e0e0ec2",
                      }}
                    >
                      <Link
                        to={`post/${user.id}`}
                        style={{
                          textDecoration: "none",
                          color: "rgb(78 14 14 / 76%)",
                        }}
                      >
                        show
                      </Link>
                    </button>
                    {user.author == currentUser && (
                      <>
                        <button
                          style={{
                            height: "auto",
                            fontSize: "17px",
                            margin: "5px",
                            backgroundColor: "#dfa6a6",
                            border: "1px solid black",
                            borderRadius: "4px",
                            color: "rgb(78 14 14 / 76%)",
                          }}
                          onClick={() => deletePost(user.id)}
                        >
                          Delete
                        </button>
                        <button
                          style={{
                            height: "auto",
                            fontSize: "17px",
                            margin: "5px",
                            backgroundColor: "bisque",
                            color: "#4e0e0ec2",
                            border: "1px solid black",
                            borderRadius: "4px",
                          }}
                        >
                          <Link
                            to={`post/${user.id}/update`}
                            style={{
                              textDecoration: "none",
                              color: "rgb(78 14 14 / 76%)",
                            }}
                          >
                            Update
                          </Link>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default Blogs;
