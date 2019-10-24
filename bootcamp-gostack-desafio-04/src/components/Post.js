import React, { Component } from "react";

import Comments from "../components/Comments";

// import { Container } from './styles';

function Post({ data }) {
  return (
    <li className="post" id={data.id}>
      <div className="post_box">
        <div className="post_author_info">
          <img
            className="post_author_img"
            src={data.author.avatar}
            alt="Profile"
          />
          <ul>
            <li>
              <span className="post_author_name">
                {data.author && data.author.name}
              </span>
            </li>
            <li>
              <span className="post_date">{data.date}</span>
            </li>
          </ul>
        </div>
        <p className="post_content">{data.content}</p>
        <hr className="post_hr" />
        {data.comments.map(comment => (
          <Comments key={comment.id} comments={comment} />
        ))}
      </div>
    </li>
  );
}

export default Post;
