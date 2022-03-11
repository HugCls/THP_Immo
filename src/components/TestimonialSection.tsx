import { Grid, Container } from "@material-ui/core";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import Testimonial from "../interfaces/Testimonial";
import TestimonialBlock from "./TestimonialBlock";

interface Props {
  testimonials: Testimonial[]
}

export default function TestimonialSection({testimonials=[]}: Props): JSX.Element {

  useEffect(() => {
    if ( !testimonials ){testimonials =[]}
  },[testimonials]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {testimonials.map((testimonial, index) => (
          <TestimonialBlock testimonial={testimonial} key={index} />
        ))}
      </Grid>
    </Container>
  );
}
