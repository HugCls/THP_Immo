import React, { useRef } from "react";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { Container, Avatar, Card, Box, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Button, TextareaAutosize, TextField, Typography, FormGroup } from "@material-ui/core";
import useRequest from "../../hooks/useRequest";
import models from "../../lib/models";
import useFetchGet from "../../hooks/useFetch";


async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}

const Post = ({ csrfToken= null, session = null, post }) => {
  
  if(!session) {
    return (

      <Container sx={{}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img width={500} src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="house" />
          </Grid>
          <Card sx={{ ml: 20, p: 2, height: 150, m: 10 }}>
            <Box sx={{ display: 'flex' }} >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{post?.author?.name[0] || "X"}</Avatar>
              <p>{post?.author?.name || "Unknown author"}</p>
            </Box>
            <p>Email : <a href="`mailto:${{props?.author?.email || 'Unknown email'}}`">{post?.author?.email || "Unknown email"}</a></p>
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
  if (session) {
    const formRef = useRef(null);
    const { isLoading, serverError, doFetch } = useRequest(
      "POST",
      "post"
    );
    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const {
        title,
        content,
        city,
        price
      } = formRef.current;
  
      const saveData = {title: title.value, content: content.value, city: city.value, price:parseInt(price.value), authorId: session.user.id}
  
      doFetch(saveData)
        
    };
    return (
      <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Modifier mon annonce </h1>
      <form ref={formRef}>
        <FormGroup sx={{mt: 4, display:'flex', flexDirection: 'column'}}  >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <TextField label="Titre" type="title" id="title" name="title" sx={{mt:3}}/>
          <Typography sx={{mt:3}}>Description</Typography>
          <TextareaAutosize minRows={6} id="content" name="content"/>
          <TextField label="Ville" type="city" id="city" name="city" sx={{mt:3}}/>
          <TextField label="Prix" type="price" id="price" name="price" sx={{mt:3}}/>
          <Button sx={{mt: 2}} type="submit"onClick={(e) => submitData(e)} >Enregistrer</Button>
        </FormGroup>  
      </form>
    </Box>
    )
  }
};

export async function GetServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  const session = await getSession(context)
  const postId = context.params?.id
  
  const {isLoading, apiData: post, serverError } = useFetchGet(`"post/${postId}"`)
  
  if (post){
    console.log(post)

    if (!session ) {
      return {
        props: { post },
      }
    }

    if (session){
      return {
        props: { csrfToken, session, post },
      }
    }
  }
}

export default Post;
