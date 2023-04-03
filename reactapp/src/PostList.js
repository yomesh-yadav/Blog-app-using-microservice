import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList() {
  const [ListOfPost, setListOfPost] = useState({});


  useEffect(() => {
    const fetchpost = async () => {
      const res = await axios.get("http://posts.com/posts");
      console.log(res.data);
      setListOfPost(res.data);
    };

    fetchpost();
  }, []);



  console.log(ListOfPost);
  const renderedPosts = Object.values(ListOfPost).map((post) => {
    return (<div className="card" style={{width:'30%',marginBottom:'20px'}} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
            </div>
    </div>);
  }); // this will give the array of objects

  return <div className="d-flex flex-row flex-wrap justify-content-between">
    {renderedPosts}
  </div>;
}

export default PostList;
