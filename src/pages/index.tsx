import { Button, Box } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PeopleIcon from "@material-ui/icons/People";
import Page from "../components/layout/Page";
import HeroSection from "../components/HeroSection";
import React from "react";
import { Card, Grid, Container } from "@mui/material";
import { GetStaticProps } from 'next';
import Post, { PostProps } from '../components/Post';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

export default function HomePage(props): JSX.Element {
  return (
    <Page maxWidth={false}>
      <HeroSection
        title="THP Immo"
        subtitle="Vendez. Achetez. En toute simplicité."
        image="/hero-8.jpg"
      >
        {/* <Link href="/react" passHref> */}
        <Button variant="contained" disableElevation sx={{ mr: 2, mt: 2 }}>
          Se connecter
        </Button>
        {/* </Link> */}
        {/* <Link href="/ios" passHref> */}
        <Button disableElevation sx={{ mr: 2, mt: 2 }}>
         S'inscrire
        </Button>
        {/* </Link> */}
      </HeroSection>
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{py: 10}}>
		      {props.feed.map((post) => (
              <Grid item xs={4}  key={post.id}>
                <Post post={post} />
              </Grid>
    	  ))}
        </Grid>
      </Container>
    </Page>
  );
}
