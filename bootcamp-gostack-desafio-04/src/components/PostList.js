import React, { Component } from "react";
import Post from "./Post";
import path from "path";

import profile from "../assets/avatar.png";
import profile2 from "../assets/profile.jpg";
import p1 from "../assets/p1.jpg";
import f1 from "../assets/f1.jpg";
import f3 from "../assets/f3.jpg";
import j1 from "../assets/j1.jpg";
import a1 from "../assets/a1.jpg";
import v1 from "../assets/v1.jpg";
import m1 from "../assets/m1.png";

// import { Container } from './styles';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 0,
        author: {
          name: "Matheus Ferreira",
          avatar: profile2
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 0,
            author: {
              name: "Felipe Deschamps",
              avatar: f1
            },
            content: "Está sim, fala com o Diego no (41) 44992440081"
          }
        ]
      },
      {
        id: 1,
        author: {
          name: "Rochele Brasim",
          avatar: f3
        },
        date: "23 Out 2019",
        content:
          "Same bed but it feels just a little bit bigger Our song on the radio but it don't sound the same",
        comments: [
          {
            id: 0,
            author: {
              name: "Julia A. Pereira",
              avatar: j1
            },
            content: "Bruno Mars xD ♪"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Fernando Almin",
          avatar: p1
        },
        date: "24 Out 2019",
        content:
          "Pessoal, alguém sabe quem anda fazendo uns sites freelance aí? tava afim de contratar!",
        comments: [
          {
            id: 1,
            author: {
              name: "Marlos Pomin",
              avatar: m1
            },
            content: "O Matheus é god irmão, tlg nisso sempre!"
          },
          {
            id: 2,
            author: {
              name: "Andre Matos",
              avatar: a1
            },
            content: "Eu adorei o site mano, ta top!"
          },
          {
            id: 3,
            author: {
              name: "Vinicius Basso Malacrida",
              avatar: v1
            },
            content: "VAI SE DANAR!"
          }
        ]
      }
    ]
  };

  componentDidMount() {
    console.log("PostList montado");
    const posts = localStorage.getItem("posts");

    if (posts) {
      this.setState({ posts: JSON.parse(posts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.posts !== this.state.posts) {
      localStorage.setItem("posts", JSON.stringify(this.state.posts));
    }
  }

  render() {
    return (
      <div className="post_container">
        <div className="post_list">
          <ul className="post">
            {this.state.posts.map(post => (
              <Post key={post.id} data={post} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostList;
