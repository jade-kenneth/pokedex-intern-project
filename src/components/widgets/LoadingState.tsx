import { CircularProgress, Flex } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import pokeball from "public/backgrounds/pokeballBg.png";
const LoadingState = () => {
  return (
    <CircularProgress
      height={"100%"}
      width={"100%"}
      isIndeterminate
      color="green.300"
    ></CircularProgress>
  );
};

export default LoadingState;
