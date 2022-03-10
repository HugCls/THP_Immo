import React from "react";
import { Avatar, Grid, Typography, Card } from "@material-ui/core";
import Testimonial from "../interfaces/Testimonial";
import Link from "next/link";

import type { Post} from "@prisma/client"
interface Props {
  testimonial: Post;
}

export default function TestimonialBlock({ testimonial }: Props): JSX.Element {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link href={`/p/${testimonial.id}`}>
        <Card variant="outlined" sx={{ height: "100%", p: 2 }}>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
            {/* {testimonial.image !== undefined ? (
              <Grid item>
                <Avatar
                  variant="circular"
                  alt={testimonial.title}
                  src={testimonial.image}
                />
              </Grid>
            ) : null} */}

            <Grid item xs>
              <Typography variant="h4">{testimonial.title}</Typography>
              <Typography variant="caption">{testimonial.price} € à {testimonial.city}</Typography>
            </Grid>
          </Grid>
          <Typography variant="body2">{testimonial.content}</Typography>
        </Card>
      </Link>
    </Grid>
  );
}
