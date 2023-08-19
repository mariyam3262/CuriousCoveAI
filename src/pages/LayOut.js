import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthRoute";

function LayOut() {
  const { logout, currentUser } = useContext(AuthContext);

  return (
    <>
      <nav>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap:'wrap',
            justifyContent: "space-around",
            backgroundColor: "rgb(255 192 203 / 87%)",
            padding: "8px",
            // boxShadow:' 10px 10px 5px #d9a4aa63',
            borderRadius: "5px",
            color: "black",
            fontSize: "22px",
            fontWeight: "600",
            fontFamily:'unset'
          }}
        >
          <div>
            {" "}
            <NavLink style={{ textDecoration:'none', color:'black'}} to="/"> Home </NavLink>{" "}
          </div>
          <div>
            {" "}
            <NavLink style={{ textDecoration:'none', color:'black'}} to="/blogs"> Blogs </NavLink>{" "}
          </div>
          <div>
            {" "}
            <NavLink style={{ textDecoration:'none', color:'black'}} to="/contact"> Contact As </NavLink>{" "}
          </div>
          {" "}
            <div><NavLink style={{ textDecoration:'none', color:'black'}} to="/chatAsst"> Blog Assistent </NavLink>{" "}
          </div>
            
            <div>
            {" "}
            {currentUser}</div>
          {" "}
          <button
              style={{
                height: "auto",
                fontSize: "20px",
                margin: "5px",
                backgroundColor: "rgb(255 219 231 / 70%)",
                border:'1px solid black',
                borderRadius:'4px',
              }}
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </button>{" "}
            
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default LayOut;
