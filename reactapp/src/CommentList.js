import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CommentList({comments}) {
  
    
    const renderedComments=comments.map((conmment)=>{
      let content;

      if (conmment.status === "approved") {
        content = conmment.content;
      }
  
      if (conmment.status === "pending") {
        content = "This comment is awaiting moderation";
      }
  
      if (conmment.status === "rejected") {
        content = "This comment has been rejected";
      }
      return  <li key={conmment.id}>{content}</li>
    });

  return (
  <ul>{renderedComments}</ul>
  )
}

export default CommentList