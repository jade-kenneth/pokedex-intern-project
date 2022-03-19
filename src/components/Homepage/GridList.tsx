import React from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import loginBg from "public/backgrounds/loginBg.png";
const GridList = () => {
  // auto-fill, minmax(11.5rem,1fr)

  return (
    <Grid
      templateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(2,1fr)",
        md: "repeat(2,1fr)",
        lg: "repeat( 4, 1fr)",
      }}
      templateRows={{
        base: "repeat(6,16.188rem)",
        md: "repeat(4,16.188rem)",
        lg: "repeat(2, 16.188rem)",
      }}
      gap="2rem"
    >
      {/**grid*/}
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
      <Flex position="relative" h="100%" w="100%">
        <Image src={loginBg} alt="bg" layout="fill" />
      </Flex>
    </Grid>
  );
};

export default GridList;
