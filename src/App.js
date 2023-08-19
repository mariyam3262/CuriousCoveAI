import "./App.css";
import { Routes, Route } from "react-router-dom";
import LayOut from "./pages/LayOut";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NotFoundPAge from "./pages/NotFoundPAge";
import ContactAs from "./pages/ContactAs";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useMemo, useState, createContext } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthRoute from "./pages/AuthRoute";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import PostUpdate from "./pages/PostUpdate";
import AIBlogAsst from "./pages/AIBlogAsst";
import AISinglePostAsst from "./pages/AISinglePostAsst";
import SubMessage from "./pages/SubMessage";

function App() {
  return (
    <>
      <AuthRoute>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route
              exact
              path="/sub-mess"
              element={
                <ProtectedRoute>
                  <SubMessage />
                </ProtectedRoute>
              }
            />
            <Route
              path="chatAsst"
              element={
                <ProtectedRoute>
                  <AIBlogAsst />
                </ProtectedRoute>
              }
            />
            <Route
              path="blogs/post/:id/chatAsst"
              element={
                <ProtectedRoute>
                  <AISinglePostAsst />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="blogs"
              element={
                <ProtectedRoute>
                  <Blogs />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="blogs/post"
              element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="blogsDetails/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="blogs/post/:id"
              element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="blogs/post/:id/update"
              element={
                <ProtectedRoute>
                  <PostUpdate />
                </ProtectedRoute>
              }
            />
            <Route path="contact" element={<ContactAs />} />

            <Route path="*" element={<NotFoundPAge />} />
          </Route>
        </Routes>
      </AuthRoute>
    </>
  );
}

export default App;
