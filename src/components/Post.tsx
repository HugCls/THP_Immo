import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Card } from "@material-ui/core";
import Button from '@mui/material/Button'

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  city: string;
  price: number;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Card sx={{p: 3}} onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h3>{post.title}</h3>
      <small>ville: <b>{post.city}</b></small>
      <p>{post.content.slice(0,100)}...</p>
      <Button sx={{}} variant="text" color="primary">En savoir plus</Button>
    </Card>
  );
};

export default Post;
