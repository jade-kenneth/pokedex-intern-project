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
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout1 from "src/components/layout/layout-1/Layout1";
import { BiFilterAlt, BiGridAlt, BiListUl } from "react-icons/bi";
import List from "src/components/Homepage/List";
import GridList from "src/components/Homepage/GridList";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { menuItems } from "src/utils/menuItems";
import Pagination from "src/components/Homepage/widgets/Pagination";
import { usePagination } from "src/hooks/usePagination";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_POKEMON,
  GET_FILTERED_POKEMON,
} from "src/graphql/pokemon/queries/pokemon";
import { GetFilteredPokemon } from "src/types/pokemon/GetFilteredPokemon";
// export const getServerSideProps: GetServerSideProps = async(context)=> {

// }

const PokedexHomePage = () => {
  const { loading, error, data, networkStatus, fetchMore } =
    useQuery<GetAllPokemons>(GET_ALL_POKEMON, {
      variables: { offset: 0, limit: 100 },
      context: { clientName: "pokedexapi" },
    });
  const [executeFiltering, { data: filtered }] =
    useLazyQuery<GetFilteredPokemon>(GET_FILTERED_POKEMON);
  const [options, setOptions] = useState<string>("grid");
  const [elements, setElements] = useState<string[]>([]);
  /** check if pokemons fetch is not undefined */
  let pokemons:
    | GetAllPokemons["pokemons"]
    | GetFilteredPokemon["filtered_pokemons"] = [];

  if (data?.pokemons) {
    pokemons = data.pokemons!;
  }
  if (filtered?.filtered_pokemons) {
    pokemons = filtered.filtered_pokemons!;
  }
  const {
    handleNext,
    handlePrev,
    data: pokemonData,
    currentPage,
    pageNumbers,
    paginate,
  } = usePagination(10, {
    pokemons: pokemons,
  });
  console.log(pokemons);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !elements.some((element) => element === e.target.value)
      ? setElements([...elements, e.target.value])
      : setElements([
          ...elements.filter((element) => element !== e.target.value),
        ]);

    executeFiltering({
      variables: { type: [`${e.target.value}`] },
      context: { clientName: "pokedexapi" },
    });
  };
  if (loading) return <h2>Loading</h2>;

  console.log(elements);
  return (
    <Box width={"container.lg"} mx="auto" position="relative" zIndex={998}>
      <HStack justify="space-between" pt="2rem" mb={"3rem"}>
        <Heading fontSize="1.5rem">Choose a pokemon</Heading>
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
            <MenuList>
              <Stack spacing={[1, 3]} direction={["column", "column"]} px={2}>
                <CheckboxGroup colorScheme="yellow">
                  {menuItems.map((item) => {
                    return (
                      <React.Fragment key={item}>
                        <Checkbox
                          flexDirection="row-reverse"
                          justifyContent="space-between"
                          value={item}
                          textTransform="capitalize"
                          onChange={(e) => handleChange(e)}
                        >
                          <Flex align="center" gap="5px">
                            <Image
                              src={`/icons/${item}.svg`}
                              alt="element"
                              h="1rem"
                            />
                            {item}
                          </Flex>
                        </Checkbox>
                      </React.Fragment>
                    );
                  })}
                </CheckboxGroup>
              </Stack>
            </MenuList>
          </Menu>
          <Icon
            as={BiListUl}
            w="1.05rem"
            h="1.2rem"
            onClick={() => setOptions("list")}
            zIndex={1}
            cursor="pointer"
          />
          <Icon
            as={BiGridAlt}
            w="1.05rem"
            h="1.2rem"
            onClick={() => setOptions("grid")}
            zIndex={1}
            cursor="pointer"
          />
        </HStack>
      </HStack>
      <Box>
        {options === "list" ? (
          <List pokemons={pokemonData()} />
        ) : (
          <GridList pokemons={pokemonData()} />
        )}
        <HStack justify="flex-end" mt="1rem">
          <Text fontSize="0.875rem">
            Showing 1-10 of {data?.pokemons.length}{" "}
          </Text>
        </HStack>
        <HStack spacing="1.85rem" justify="center" pb="3.688rem">
          <IconButton
            w="0.3rem"
            h="0.5rem"
            bg="transparent"
            icon={<MdKeyboardArrowLeft />}
            aria-label="prev button"
          />
          <Pagination
            handleNext={handleNext}
            handlePrev={handlePrev}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            paginate={paginate}
          />
          <IconButton
            w="0.3rem"
            h="0.5rem"
            bg="transparent"
            icon={<MdKeyboardArrowRight />}
            aria-label="prev button"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default PokedexHomePage;

PokedexHomePage.getLayout = (page: React.ComponentType<{}> | JSX.Element) => {
  return <Layout1>{page}</Layout1>;
};
