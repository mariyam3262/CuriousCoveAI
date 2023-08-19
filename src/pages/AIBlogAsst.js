import React, { useEffect } from "react";
import ChatAI from "./ChatAI";
import { useState } from "react";
import axios from "axios";

function AIBlogAsst(props) {
  const [query, setQuery] = useState("");
  const [copyFlag, setCopyFlag] = useState(false);
  const [customQuery, setCustomQuery] = useState("")
  

  const fetchPost = (postid) => {
    console.log(postid)
    axios
      .get(`http://localhost:3001/posts/${postid}`)
      .then((res) => {setCustomQuery(res.data.post);setQuery(res.data.post)})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props?.id && fetchPost(props.id.id);
  }, []);

  const { generate, mycontent, stop } = ChatAI();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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
          padding: "30px 30px",
          borderRadius: "15px",
          maxHeight: '480px',
          backgroundColor: "rgb(255 192 203 / 42%)",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            lineHeight: "20px",
          }}
        >
          Here i'm to assist you for best content for your next Blog
        </div>

        <div
          style={{
            lineHeight: "10px",
            padding: "10px",
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <p>Generated Text</p>
            <button
              style={{
                borderRadius: "4px",
                fontSize: "17px",
                marginTop: "15px",
                backgroundColor: "bisque",
                color: "#4e0e0ec2",
                margin: "10px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(mycontent.data).then(
                  function () {
                    setCopyFlag(true);
                  },
                  function () {
                    alert("Failed to copy text to clipboard.");
                  }
                );
              }}
            >
              {copyFlag ? "copied " : "copy"}
            </button>
          </div>

          <div
            style={{
              lineHeight: "25px",
              overflow: "auto",
              maxHeight: "180px",
              height:'200px',
            }}
          >
            {mycontent.data.matchAll(/[0-9]\./g)
              ? mycontent.data.split(/[0-9]\./).map(
                  (line, i) =>
                    line !== "" && (
                      <p>
                        {i}. {line}
                      </p>
                    )
                )
              : mycontent.data}
          </div>
        </div>

        <textarea
          style={{
            paddingTop: "20px",
          }}
          type="text"
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Enter prompt..."
          rows="5"
          cols="100"
          value={customQuery}
        ></textarea>
        <div>
          <button
            style={{
              borderRadius: "4px",
              fontSize: "17px",
              margin: "5px",
              backgroundColor: "bisque",
              color: "#4e0e0ec2",
            }}
            onClick={() => {
              !props && setCustomQuery("");

              generate(customQuery);
            }}
          >
            Generate
          </button>
          <button
            style={{
              borderRadius: "4px",
              fontSize: "17px",
              margin: "5px",
              backgroundColor: "bisque",
              color: "#4e0e0ec2",
            }}
            onClick={() => stop()}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIBlogAsst;
