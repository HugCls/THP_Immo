import React, { useEffect, useRef, useState } from "react";
import { Container, Avatar, Card, Box, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import useRequest from "../../hooks/useRequest";

import type { Post } from "@prisma/client";
import { PostProps } from "../../components/Post";


const Post = ({ postId }) => {
  
  const { isLoading, serverError, doFetch, apiData: requestPost } = useRequest("GET", `post/${postId}`);

  const [post, setPost] = useState<PostProps>()

  useEffect(() => {
    doFetch()
  }, [])

  useEffect(() => {
    if(isLoading === false && requestPost !== null) {
      setPost(requestPost)
      console.log(post)
    }
  }, [isLoading, post])

  if (!post){return(<h1>Wait and see</h1>)}
  if (post){
   return (

      <Container sx={{}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img width={500} src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="house" />
          </Grid>
          <Card sx={{ ml: 20, p: 2, height: 150, m: 10 }}>
            <Box sx={{ display: 'flex' }} >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{post.author.name[0] || "X"}</Avatar>
              <p>{post.author.name}</p>
            </Box>
            <p>Email : <a href="`mailto:${{post.author.email'}}`">{post.author.email || "Unknown email"}</a></p>
          </Card>
          <Grid item xs={12}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><b>Ville: </b>{post.city}</p>
          </Grid>

        </Grid>
      </Container>
    );
  }
};

export async function getServerSideProps(context) {

  const postId = context.params?.id

  return {
    props: { postId },
  }
}

export default Post;
