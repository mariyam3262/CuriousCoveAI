import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./data";
import axios from "axios";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitedData, setSubmitedData] = useState(userData);
  const { USERS, setUSERS } = useData();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userData.password === userData.confirmPassword
      ? saveUser({ ...userData })
      : alert("password does not match");
    navigate("/");
  };

  const saveUser = (data) => {
    const username = `${userData.name.split(" ")[0]}${
      Math.floor(Math.random() * 1000) + 1
    }`;
    console.log("----------------", submitedData);
    axios
      .post("http://localhost:3001/users", { ...data, username: username })
      .then((res) => alert(res.data.username))
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffc0cb6b",
          padding: "0px 80px 80px 80px",
          borderRadius: "30px",
        }}
      >
        <div style={{ fontSize: "30px" ,  fontWeight: "600", marginTop:'20px'}}>sign up </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={handleSubmit}
        >
          <label
            style={{
              fontSize: "20px",
              fontWeight: "50",
              margin: "20px",
            }}
          >
            Name :{" "}
            <input
              required
              type="text"
              style={{ height: "25px", borderRadius: "5px" }}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value.trim() })
              }
            />
          </label>
          <label
            style={{
              fontSize: "20px",
              fontWeight: "50",
              margin: "20px",
            }}
          >
            Email :{" "}
            <input
              required
              type="email"
              style={{ height: "25px", borderRadius: "5px" }}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value.trim() })
              }
            />
          </label>
          <label
            style={{
              fontSize: "20px",
              fontWeight: "50",
              margin: "20px",
            }}
          >
            password :{" "}
            <input
              required
              type="password"
              style={{ height: "25px", borderRadius: "5px" }}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value.trim() })
              }
            />
          </label>
          <label
            style={{
              fontSize: "20px",
              fontWeight: "50",
              margin: "20px",
            }}
          >
            confirm password :{" "}
            <input
              required
              type="password"
              style={{ height: "25px", borderRadius: "5px" }}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  confirmPassword: e.target.value.trim(),
                })
              }
            />
          </label>
          <div>
            <button
              type="submit"
              style={{
                border: "1px solid black",
                borderRadius: "4px",
                fontSize: "18px",
                backgroundColor: "bisque",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
