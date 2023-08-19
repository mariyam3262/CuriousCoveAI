import axios from "axios";
import  { useEffect, useState } from "react";

const useBlogs = () => {
  const [BLOGS, setBLOGS] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => setBLOGS([...res.data]))
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then((res) => {
        res.status == 200 && setBLOGS(BLOGS.filter((post) => post.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const postData = async (post) => {
    await axios
      .post("http://localhost:3001/posts", {
        ...post,
        time: `${new Date().getHours()}H ${new Date().getMinutes()}M`,
        date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      })
      .then((res) => setBLOGS([...BLOGS, { ...res.data }]))
      .catch((err) => console.log(err));
  };

  const updatePost = async (id, data) => {
    await axios
      .put("http://localhost:3001/posts/" + id, {
        ...data,
        time: `${new Date().getHours()}h ${new Date().getMinutes()}m`,
        date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return { BLOGS, setBLOGS, deletePost, postData, updatePost };
};

export default useBlogs;
