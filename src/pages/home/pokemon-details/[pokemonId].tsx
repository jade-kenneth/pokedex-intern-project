import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
  TabPanel,
  Flex,
  Tag,
  Center,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
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
import { GetStaticProps, GetStaticPaths } from "next";
import {
  GetEachPokemon,
  GetEachPokemonVariables,
} from "src/types/pokemon/GetEachPokemon";
import {
  GetAllPokemons,
  GetAllPokemonsVariables,
} from "src/types/pokemon/GetAllPokemons";
import PokemonThemeChanger from "src/components/Pokemon/PokemonThemeChanger";
import usePokemonDetailStore from "src/hooks/usePokemonDetailStore";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import useRecentViewStore from "src/hooks/useRecentViewStore";
import { usePagination } from "src/hooks/usePagination";
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<
    GetAllPokemons,
    GetAllPokemonsVariables
  >({
    query: GET_ALL_POKEMON,
    variables: { offset: 0, limit: 100 },
    context: { clientName: "pokeapi" },
  });

  const paths = data.pokemons.map((pokemon) => {
    return {
      params: { pokemonId: `${pokemon.id}` },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const { data } = await apolloClient.query<
    GetEachPokemon,
    GetEachPokemonVariables
  >({
    query: GET_EACH_POKEMON,
    variables: { id: parseInt(params?.pokemonId as string) },
    context: { clientName: "pokeapi" },
  });

  return {
    props: {
      pokemonDetails: data.pokemonDetails,
    },
  };
};

const About = ({ pokemonDetails }: GetEachPokemon) => {
  const store = usePokemonDetailStore((state) => state);
  const state = useRecentViewStore((state) => state);
  const router = useRouter();
  const { handleNext, handlePrev, data } = usePagination(6, {
    pokemons: state.recents,
  });

  useEffect(() => {
    console.log("hey");
    store.setPokemonDetails(pokemonDetails!);
  }, [pokemonDetails]);

  const routerLink = router.asPath.split("/");

  if (!pokemonDetails?.types) return <h2>Loading ...</h2>;
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
                  href={`/${routerLink.slice(1, idx + 1).join("/")}`}
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

      <Stack align="flex-start" direction={"row"} spacing={"4.313rem"}>
        {/** Profile*/}
        <VStack spacing="2.188rem">
          <Stack w={"20.313rem"} h={"24.313rem"} position="relative">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonDetails?.id}.png`}
              alt="profile"
              layout="fill"
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
            <Heading fontSize="2rem" textTransform={"capitalize"}>
              {pokemonDetails?.name}
            </Heading>
            <HStack spacing={"0.5rem"}>
              {pokemonDetails?.types.map((type, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <PokemonThemeChanger
                      pokemonType={type.type?.name}
                      w={"6.375rem"}
                      py={"0.5rem"}
                      as="text"
                      textAlign="center"
                      borderRadius={"50px"}
                    >
                      {type.type?.name}
                    </PokemonThemeChanger>
                  </React.Fragment>
                );
              })}
            </HStack>
          </VStack>
          <TabComponent />
        </Stack>
      </Stack>
    </Box>
  );
};

export default About;
About.getLayout = (page: React.ComponentType<{}> | JSX.Element) => {
  return <Layout1>{page}</Layout1>;
};
