import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MdArrowRight } from "react-icons/md";
import Layout1 from "src/components/Layouts/layout-1/Layout1";
import profile from "public/backgrounds/signupBg.png";
import TabComponent from "src/components/About/TabComponent";
import apolloClient from "src/apollo/apollo-client";
import {
  GET_ALL_POKEMON,
  GET_EACH_POKEMON,
} from "src/graphql/pokemon/queries/pokemon";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import {
  GetEachPokemon,
  GetEachPokemonVariables,
} from "src/types/pokemon/GetEachPokemon";
import {
  GetAllPokemons,
  GetAllPokemonsVariables,
} from "src/types/pokemon/GetAllPokemons";

import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import useRecentViewStore from "src/hooks/useRecentViewStore";
import { usePagination } from "src/hooks/usePagination";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
import PokemonList from "src/components/About/Battle/PokemonList";
import useBattleState from "src/hooks/useBattleState";
import Loading from "src/components/Homepage/widgets/Loading";
import { useSession } from "next-auth/react";
import useBattleStateStore from "src/hooks/useBattleStageStore";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const { data, errors } = await apolloClient.query<
    GetEachPokemon,
    GetEachPokemonVariables
  >({
    query: GET_EACH_POKEMON,
    variables: { id: parseInt(params?.pokemonId as string) },
    context: { clientName: "pokeapi" },
  });
  if (!data.pokemonDetails) {
    return { notFound: true };
  }
  return {
    props: {
      pokemonDetails: data.pokemonDetails,
    },
  };
};

const About = ({ pokemonDetails }: GetEachPokemon) => {
  const store = usePokemonDetailStore((state) => state);
  const state = useRecentViewStore((state) => state);
  const battleState = useBattleState((state) => state);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleNext, data, handlePrev, setCurrentPage } = usePagination(6, {
    pokemons: state.recents,
  });

  useEffect(() => {
    store.setPokemonDetails(pokemonDetails!);
    battleState.setOpponent(parseInt(router.query.pokemonId as string));
    state.addToRecentView(
      pokemonDetails?.id!,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonDetails?.id}.png`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonDetails, router.query.pokemonId]);

  const handleBattle = () => {
    if (battleState.mode === "battle") {
      battleState.setOpponent(0);
      battleState.setMode("list");
    } else {
      battleState.setOpponent(parseInt(router.query.pokemonId as string));
      battleState.setMode("battle");
    }
  };
  useEffect(() => {
    if (pokemonDetails) {
      setLoading(false);
    }
  }, [pokemonDetails]);
  const routerLink = router.asPath.split("/");

  if (!pokemonDetails) return <Loading type="loading" />;
  // if (pokemonDetails && pokemonDetails === "error")
  //   return <Loading type="error" message="Who's that Pokemon?" />;
  return (
    <Box mt={"1.375rem"} w={"container.lg"} mx="auto">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
        mb={"2.625rem"}
      >
        {routerLink.map((link, idx) => {
          return (
            idx !== 0 &&
            idx !== routerLink.length - 1 && (
              <BreadcrumbItem key={idx}>
                <BreadcrumbLink
                  onClick={() =>
                    router.push(
                      `/${routerLink.slice(1, idx + 1).join("/")}`,
                      undefined,
                      { shallow: false }
                    )
                  }
                >
                  {routerLink[idx].split("-").length >= 2 ? (
                    routerLink[idx].split("-").map((data, idx) => {
                      return (
                        <Text
                          as={"span"}
                          key={idx}
                          textTransform={"capitalize"}
                        >
                          {" "}
                          {data}
                        </Text>
                      );
                    })
                  ) : (
                    <Text textTransform={"capitalize"}>{routerLink[idx]}</Text>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )
          );
        })}
      </Breadcrumb>

      <Stack
        align={{ base: "center", lg: "flex-start" }}
        direction={{ base: "column", lg: "row" }}
        spacing={"4.313rem"}
      >
        {/** Profile*/}
        <VStack spacing="2.188rem">
          <Stack w={"20.313rem"} h={"24.313rem"} position="relative">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonDetails?.id}.png`}
              alt="profile"
              width={10}
              height={10}
              layout="responsive"
            />
          </Stack>

          <HStack align="center" spacing={"2.225rem"}>
            <Icon
              onClick={() => handlePrev()}
              as={IoIosArrowDropleft}
              fontSize="2.5rem"
              cursor={"pointer"}
            ></Icon>
            <Grid
              templateRows={"repeat(2, 3.563rem)"}
              templateColumns={"repeat(3, 3.563rem)"}
              columnGap={"0.5rem"}
              rowGap={"1.125rem"}
            >
              {data().map((data: any) => {
                return (
                  <Box
                    key={data.id}
                    border="1px solid gray"
                    onClick={() => {
                      setCurrentPage(1);
                      state.viewRecent(
                        data.id,
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`
                      );
                      router.push(`/home/pokemon-details/${data.id}`);
                    }}
                  >
                    <Image
                      src={data.img}
                      alt="profile"
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                );
              })}
            </Grid>
            <Icon
              onClick={() => handleNext()}
              as={IoIosArrowDropright}
              fontSize="2.5rem"
              cursor={"pointer"}
            ></Icon>
          </HStack>
        </VStack>
        {/** POKEMON NAME */}
        <Stack width="100%">
          <VStack align="flex-start" spacing={"1rem"} mb={"3.25rem"}>
            <HStack justify={"space-between"} align="center" w="100%">
              <Heading fontSize="2rem" textTransform={"capitalize"}>
                {pokemonDetails?.name}
              </Heading>
              <Button onClick={() => handleBattle()}>
                {battleState.mode === "battle" ? "Cancel" : "Battle Mode"}
              </Button>
            </HStack>
            <HStack spacing={"0.5rem"}>
              {pokemonDetails?.types.map((type, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Box
                      w={"6.375rem"}
                      py={"0.5rem"}
                      as="text"
                      textAlign="center"
                      borderRadius={"50px"}
                      bg={getPokemonElementColor(type.type?.name!)}
                    >
                      {type.type?.name}
                    </Box>
                  </React.Fragment>
                );
              })}
            </HStack>
          </VStack>
          {battleState.mode === "battle" ? (
            <PokemonList pokemons={[]} />
          ) : (
            <TabComponent pokemonDetails={pokemonDetails} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default About;
About.getLayout = (page: React.ComponentType<{}> | JSX.Element) => {
  return <Layout1>{page}</Layout1>;
};
