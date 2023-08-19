import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthRoute";
import axios from "axios";

const SignIn = () => {
  const { user, login, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [USERS, setUSERS] = useState([]);
  const [userData, setUserdata] = useState({ username: "", password: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setUSERS(res.data))
      .catch((err) => console.log(err));
  }, []);

  const loggedInFunction = (name) => {
    login(name);
    setCurrentUser(name);
    navigate(state?.path || "/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    // console.log(USERS);
    USERS.some(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password
    )
      ? loggedInFunction(userData.username)
      : alert("username or password is invalid");
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
      {user === "false" ? (
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
          <div
            style={{
              padding: "15px",
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Sign In
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <label
              style={{
                fontSize: "20px",
                fontWeight: "50",
                margin: "20px",
              }}
            >
              Username :{" "}
              <input
                type="text"
                autoFocus
                value={userData.userData}
                style={{ height: "25px", borderRadius: "5px" }}
                onChange={(e) =>
                  setUserdata({ ...userData, username: e.target.value.trim() })
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
              {" "}
              Password :{" "}
              <input
                type="password"
                value={userData.password}
                style={{ height: "25px", borderRadius: "5px" }}
                onChange={(e) =>
                  setUserdata({ ...userData, password: e.target.value.trim() })
                }
              />
            </label>
            <div>
              <button
                style={{
                  border: "1px solid black",
                  borderRadius: "4px",
                  fontSize:'18px',
                  backgroundColor:'bisque'
                }}
                type="submit"
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default SignIn;
