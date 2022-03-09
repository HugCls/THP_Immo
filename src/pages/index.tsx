import { Button, Container, Box } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PeopleIcon from "@material-ui/icons/People";
import Page from "../components/layout/Page";
import HeroSection from "../components/HeroSection";
import React from "react";
import FeatureContainer from "../components/FeatureContainer";
import FeatureBlocksContainer from "../components/FeatureBlocksContainer";
import FeatureBlock from "../components/FeatureBlock";
import BigSection from "../components/BigSection";
import Image from "next/image";
import TestimonialSection from "../components/TestimonialSection";
import { testimonials } from "../data/testimonials";


export default function HomePage(): JSX.Element {
  return (
    <Page maxWidth={false}>
      <HeroSection
        title="THP Immo"
        subtitle="Vendez. Achetez. En toute simplicité."
        image="/assets/hero-8.svg"
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
      <FeatureContainer>
        <FeatureBlocksContainer type={undefined} sx={{ mb: 4}}>
          <FeatureBlock 
            title="Intuitif"
            icon={<PeopleIcon />}
            content={
              <>
                Consequat id porta nibh venenatis cras sed felis eget velit. Ac
                felis donec et odio pellentesque diam volutpat commodo.
              </>
            }
          />
          <FeatureBlock
            title="Simple"
            icon={<StarIcon />}
            content={
              <>
                Ultricies leo integer malesuada nunc vel. Egestas pretium aenean
                pharetra magna ac placerat vestibulum.
              </>
            }
          />
          <FeatureBlock
            title="Un réseaux gigantesque"
            icon={<PeopleIcon />}
            content={
              <>
                Vitae turpis massa sed elementum tempus egestas. Commodo sed
                egestas egestas fringilla phasellus faucibus.
              </>
            }
          />
        </FeatureBlocksContainer>
      </FeatureContainer>
      <BigSection
        title="La référence en matière d'Immo"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Container sx={{ display: "flex", justifyContent: "center", mb: 16 }}>
        <Image src="/assets/rocket.svg" width={500} height={500} />
      </Container>
      <Box sx={{ mb: 4 }}>
        <BigSection
          title="Les annonces"
          subtitle="Voici les annonces de ta région :"
        />
      </Box>
      <Box sx={{ mb: 8 }}>
        <TestimonialSection testimonials={testimonials} />
      </Box>
    </Page>
  );
}