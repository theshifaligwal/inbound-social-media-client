import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { REACT_APP_BACKEND_API_LINK } = process.env;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`${REACT_APP_BACKEND_API_LINK}/posts/profile/` + username)
        : await axios.get(`${REACT_APP_BACKEND_API_LINK}/posts/timeline/` + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id, REACT_APP_BACKEND_API_LINK]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
