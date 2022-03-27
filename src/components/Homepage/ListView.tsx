import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Avatar,
  useColorModeValue,
  VStack,
  Tag,
} from "@chakra-ui/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";
import { motion } from "framer-motion";
import PokemonThemeChanger from "../Pokemon/PokemonThemeChanger";
import getPokemonElementColor from "src/helpers/getPokemonElementColor";
const ListView = ({ pokemons }: GetAllPokemons) => {
  const MotionTr = motion(Tr);
  const router = useRouter();
  const tagBg = useColorModeValue("gray.300", "secondary");
  return (
    <Table
      variant="simple"
      size="sm"
      mx="auto"
      bg={useColorModeValue("gray.100", "headerBgColor")}
    >
      <Thead textTransform="capitalize">
        <Tr>
          <Th w="3.063rem">#</Th>
          <Th w="4.688rem"></Th>
          <Th w="17.542rem">Pokemon</Th>
          <Th w="17.542rem">Type</Th>
          <Th w="17.542rem">Level</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pokemons.map((data) => {
          return (
            <MotionTr
              h="3.25rem"
              key={data.id}
              onClick={() => router.push(`/home/pokemon-details/${data.id}`)}
              _hover={{ cursor: "pointer" }}
              whileHover={{ scale: 1.1 }}
              borderBottom="1px"
              borderColor="red"
              bg={tagBg}
            >
              <Td>{data.id}</Td>
              <Td>
                <Avatar
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}
                  w="2rem"
                  h="2rem"
                  bg={getPokemonElementColor(data.types[0].type?.name!)}
                />
              </Td>
              <Td>
                <Text>{data.name}</Text>
              </Td>
              <Td>
                <VStack align="left">
                  {data.types.map((type) => {
                    return (
                      <PokemonThemeChanger
                        key={type.type?.name}
                        color={getPokemonElementColor(type.type?.name!)}
                      >
                        {type.type?.name!}
                      </PokemonThemeChanger>
                    );
                  })}
                </VStack>
              </Td>
              <Td>Level 1</Td>
            </MotionTr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default ListView;
