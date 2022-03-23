import { Box, Flex, Grid, Image as ChakraImage } from "@chakra-ui/react";

import Header from "./Header";

import React, { useEffect, useState } from "react";
import pokeballsmall from "public/backgrounds/pokeballsmall.png";
import pokeballlarge from "public/backgrounds/pokeball.png";
import Image from "next/image";
import { items } from "src/utils/bgDataAndCoordinates";

const Layout1: React.FC<{}> = ({ children }) => {
  return (
    <Grid templateRows="7rem">
      <Header />

      <Box minH={"100vh"} position="relative">
        <Flex
          position="absolute"
          top="-50px"
          right="0px"
          width="270px"
          height="420px"
          zIndex={-2}
        >
          <Image src={pokeballlarge} alt={"pokeball"} layout="fill" />
        </Flex>
        <Flex
          position="absolute"
          left="0px"
          bottom="0px"
          width="12rem"
          height="14rem"
          zIndex={-2}
        >
          <Image src={pokeballsmall} alt={"pokeball"} layout="fill" />
        </Flex>

        {items.map((_, idx) => {
          let isAnchoredLeft = items[idx][4] === "left" ? true : false;
          const verticalPosition = (items[idx][2][0] / 1440) * 100;

          return (
            <React.Fragment key={idx}>
              <ChakraImage
                position="absolute"
                bottom={`${items[idx][2][1]}px`}
                right={isAnchoredLeft ? undefined : `${verticalPosition}%`}
                left={isAnchoredLeft ? `${verticalPosition}%` : undefined}
                src={`/icons/${items[idx][0]}.svg`}
                w={`${items[idx][1][0]}rem`}
                h={`${items[idx][1][1]}rem`}
                transform={`rotate(${items[idx][3]}deg)`}
                alt={"element"}
                zIndex={-1}
              />
            </React.Fragment>
          );
        })}
        {children}
      </Box>
    </Grid>
  );
};

export default Layout1;
