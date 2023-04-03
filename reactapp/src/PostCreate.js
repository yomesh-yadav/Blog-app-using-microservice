import React, { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, settitle] = useState("");
  const onsubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://posts.com/posts/create", {
      title,
    });
    settitle("");
  };

  return (
    <div>
      <form className="form-group" method="post" onSubmit={onsubmit}>
        <label> <h2> Title :  </h2></label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
