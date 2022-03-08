import React from "react";
import Link from 'next/link';
import { Button } from './src/components/Button';
import { HeroOneButton } from './src/components/HeroOneButton';
import { Section } from './src/components/Section';
import hero8 from '../../assets/images/hero-bg/hero-8.jpg';


const Hero = () => (


    <Section yPadding="pt-20 pb-32">
      
      <HeroOneButton
      
        title={
          <>
            {'THP Immo\n'}
            <span className="text-primary-500">Vendez. Achetez. En toute simplicité</span>
          </>
        }
        description="The easiest way to build a React landing page in seconds."
        button={
          <Link href="">
            <a>
              <Button xl>Commencez à vendre/acheter</Button>
            </a>
          </Link>
        }
      />
    </Section>
);

export default Hero