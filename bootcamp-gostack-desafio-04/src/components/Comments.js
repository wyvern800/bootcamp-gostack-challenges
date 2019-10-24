import React, { Component } from "react";

// import { Container } from './styles';

function Comments({ comments }) {
  return (
    <>
      <div className="comment_box">
        <img className="comment_author_img" src={comments.author.avatar} />
        <div className="comment_baloon">
          <span className="comment_content">
            <strong>{comments.author && comments.author.name} </strong>
            {comments.content}.
          </span>
        </div>
      </div>
    </>
  );
}

export default Comments;
