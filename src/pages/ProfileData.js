import { useEffect, useState } from "react";
import axios from "axios";

const useProfile = (id) => {

  const [users, setUsers] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [post, setPost] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => setAllPost([...res.data]))
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:3001/users")
      .then((res) => setUsers([...res.data]))
      .catch((err) => console.log(err));
 
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) => setPost({...res.data}))
      .catch((err) => console.log(err));

  }, []);
   
    
  return { users, post, allPost };
};

export default useProfile;
