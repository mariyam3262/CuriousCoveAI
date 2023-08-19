import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthRoute";
import ChatAI from "./ChatAI";

const Home = () => {
  const { user, logout, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const {generate, mycontent} = ChatAI()

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  // console.log(mycontent)
  useEffect(()=>{
    user == "true" || !currentUser?
    generate(`generate welcoming 2-3 line passage for user ${currentUser ? currentUser : "user"} ,  add  emoji icons`):
    generate(`generate log out message for  ${currentUser ? currentUser : "user"} , add emoji icons`)
    
  },[user])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          marginTop: "70px",
          borderRadius: "10px",
          width: "500px",
          backgroundColor: "rgb(255 192 203 / 42%)",
        }}
      >
        <div style={{ fontSize: '45px'}}> Hurraaaa !!</div>
        <p
        style={{
          fontSize: "20px",
          height:'100%'
        }}
      >
         { mycontent.data}
      </p>

        { user === "false" &&
          <div>
            <button style={{
              marginRight:'50px',
              border:'1px solid black',
              borderRadius:'4px',
              fontSize:'18px',
              padding:'5px 25px',
              backgroundColor:'bisque'
            }}>
              {" "}
              <Link to="logIn" style={{textDecoration: 'none', color:'#4e0e0ec2'}}>Sign in </Link>{" "}
            </button>
            <button style={{
              marginLeft:'50px',
              border:'1px solid black',
              borderRadius:'4px',
              fontSize:'18px',
              padding:'5px 25px',
              backgroundColor:'bisque'
            }}>
              {" "}
              <Link to="signup" style={{textDecoration: 'none', color:'#4e0e0ec2'}}> Sign up </Link>
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
