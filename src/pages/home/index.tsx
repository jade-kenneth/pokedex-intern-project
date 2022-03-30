import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  MenuButton,
  Menu,
  MenuList,
  CheckboxGroup,
  Stack,
  Checkbox,
  Image as ChakraImage,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import Layout1 from "src/components/Layouts/layout-1/Layout1";
import { BiFilterAlt, BiGridAlt, BiListUl } from "react-icons/bi";
import ListView from "src/components/Homepage/ListView";
import GridView from "src/components/Homepage/GridView";
import Image from "next/image";
import Pagination from "src/components/Homepage/widgets/Pagination";
import { usePagination } from "src/hooks/usePagination";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";
import { useLazyQuery } from "@apollo/client";
import {
  GET_ALL_POKEMON,
  GET_FILTERED_POKEMON,
} from "src/graphql/pokemon/queries/pokemon";
import { GetFilteredPokemon } from "src/types/pokemon/GetFilteredPokemon";
import useGetPokemonTypes from "src/helpers/getPokemonTypes";
import { GetStaticProps } from "next";
import { FcDeleteDatabase } from "react-icons/fc";
import apolloClient from "src/apollo/apollo-client";
import Loading from "src/components/Homepage/widgets/Loading";
import useBattleState from "src/hooks/useBattleState";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: GET_ALL_POKEMON,
    variables: { offset: 0, limit: 100 },
    context: { clientName: "pokeapi" },
  });

  return { props: { pokemons: data.pokemons } };
};
export interface PokedexProps {
  pokemons: GetAllPokemons["pokemons"];

  header?: string;
}
const Pokedex = ({ header, pokemons }: PokedexProps) => {
  const [fetchData, { data, fetchMore }] = useLazyQuery<GetAllPokemons>(
    GET_ALL_POKEMON,
    { context: { clientName: "pokeapi" } }
  );
  const [executeFiltering, { loading: filterLoading, data: filtered }] =
    useLazyQuery<GetFilteredPokemon>(GET_FILTERED_POKEMON, {
      context: { clientName: "pokeapi" },
    });
  const [options, setOptions] = useState<"grid" | "list">("grid");
  const [elements, setElements] = useState<string[]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const battleState = useBattleState((state) => state);
  const { types } = useGetPokemonTypes();

  const numberPerPage = 10;
  const router = useRouter();

  /** check if pokemons fetch is not undefined */
  let pokemonFetched:
    | GetAllPokemons["pokemons"]
    | GetFilteredPokemon["filtered_pokemons"] = [];

  /**
   * check if data is present so that usePagination
   * will only get the initial empty array instead of undefined resulting to an error
   * hooks/usePagination.tsx -> line 19
   * the error: pokemon.length -> returns undefined cause
   */
  /**  */
  if (!isFilter && pokemons) {
    pokemonFetched = pokemons!;
  }
  if (isFilter && filtered?.filtered_pokemons) {
    pokemonFetched = filtered?.filtered_pokemons!;
  }
  if (!isFilter && data?.pokemons) {
    pokemonFetched = data.pokemons;
  }
  const {
    handleNext,
    handlePrev,
    data: pokemonData,
    currentPage,
    pageNumbers,
    paginate,
    setCurrentPage,
  } = usePagination(numberPerPage, {
    pokemons: pokemonFetched,
  });
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    const handleRouteChange = () => {
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? "with" : "without"
      //   } shallow routing ${state}`
      // );
      setLoading(true);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    /** after toggling filter this fires
     * if filter then execute filter
     * else fetch default data
     */
    if (isFilter) {
      (async function getFilteredData() {
        await executeFiltering({
          variables: { type: elements },
        });
        setCurrentPage(1);
      })();
    } else {
      (async function getData() {
        await fetchData({
          variables: { offset: 0, limit: 100 },
        });
        setCurrentPage(1);
      })();
    }
  }, [elements, isFilter, setCurrentPage, fetchData, executeFiltering]);

  useEffect(() => {
    if (!router.query.pokemonId) {
      battleState.setOpponent(0);
    }
    battleState.setMode("list");
  }, [router.query.pokemonId]);
  const handleFetchMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: 0,
        limit: pokemonFetched.length + 100,
      },
      updateQuery: (_, { fetchMoreResult: pokemons }): GetAllPokemons => {
        setLoading(false);
        return pokemons!;
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let types: string[] = [];
    // !types.some((type) => type === e.target.value)
    //   ? types.push(e.target.value)
    //   : types.filter((type) => type !== e.target.value);

    /** if element is present in array then filter else add */
    !elements.some((element) => element === e.target.value)
      ? setElements([...elements, e.target.value])
      : setElements([
          ...elements.filter((element) => element !== e.target.value),
        ]);
  };

  /** checking if elements/types array if empty or not
   * if not empty indicates filter is being toggle -> element array ex: ['grass']
   * else empty indicates filter mode is off -> []
   *
   */
  useEffect(() => {
    if (elements.length > 0) {
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  }, [elements.length, setIsFilter]);

  if (!pokemonFetched || loading) return <Loading type="loading" />;

  return (
    <Flex
      direction={"column"}
      w={{
        base: "95%",
        lg: battleState.mode === "battle" ? "100%" : "container.lg",
      }}
      mx="auto"
      position="relative"
      zIndex={998}
    >
      <HStack justify="space-between" pt="2rem" mb={"3rem"}>
        <Heading fontSize={"1.5rem"}>
          {header ? header : "Choose a pokemon"}
        </Heading>
        <HStack spacing={3}>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BiFilterAlt />}
              variant="outline"
              w="1.05rem"
              h="1.2rem"
            />
            <MenuList
              height="250px"
              overflow={"hidden"}
              overflowY={"scroll"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "primary",
                  borderRadius: "24px",
                },
              }}
            >
              <Stack spacing={[1, 3]} direction={["column", "column"]} px={2}>
                <CheckboxGroup colorScheme="yellow">
                  {types
                    ?.filter((type) => type.name !== "unknown")
                    .map((item) => {
                      return (
                        <React.Fragment key={item.name}>
                          <Checkbox
                            flexDirection="row-reverse"
                            justifyContent="space-between"
                            value={item.name}
                            textTransform="capitalize"
                            onChange={(e) => handleChange(e)}
                          >
                            <Flex
                              align="center"
                              gap="5px"
                              position={"relative"}
                            >
                              {item.name}
                            </Flex>
                          </Checkbox>
                        </React.Fragment>
                      );
                    })}
                </CheckboxGroup>
              </Stack>
            </MenuList>
          </Menu>
          {battleState.mode !== "battle" && (
            <Icon
              as={BiListUl}
              w="1.05rem"
              h="1.2rem"
              onClick={() => setOptions("list")}
              zIndex={1}
              cursor="pointer"
            />
          )}
          {battleState.mode !== "battle" && (
            <Icon
              as={BiGridAlt}
              w="1.05rem"
              h="1.2rem"
              onClick={() => setOptions("grid")}
              zIndex={1}
              cursor="pointer"
            />
          )}
        </HStack>
      </HStack>
      {filterLoading ? (
        <Loading type="loading" />
      ) : (
        <Box>
          {options === "grid" ? (
            <GridView loading={loading} pokemons={pokemonData()} />
          ) : (
            <ListView pokemons={pokemonData()} />
          )}

          <HStack spacing="1.85rem" justify="center" pb="3.688rem">
            <Pagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              paginate={paginate}
              numberPerPage={numberPerPage}
              handleFetchMore={handleFetchMore}
              isFilter={isFilter}
            />
          </HStack>
        </Box>
      )}
    </Flex>
  );
};

export default Pokedex;

Pokedex.getLayout = (page: React.ComponentType<{}> | JSX.Element) => {
  return <Layout1>{page}</Layout1>;
};
