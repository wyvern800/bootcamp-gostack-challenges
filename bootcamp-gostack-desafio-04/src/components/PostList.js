import React, { Component } from "react";
import Post from "./Post";

// import { Container } from './styles';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "http://url-da-imagem.com/imagem.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "http://url-da-imagem.com/imagem.jpg"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2
        // Restante dos dados de um novo post
      }
    ]
  };
  componentDidMount() {
    console.log("PostList montado");
  }

  render() {
    return (
      <div id="post_list">
        fytfytf
        <Post />
      </div>
    );
  }
}

export default PostList;
