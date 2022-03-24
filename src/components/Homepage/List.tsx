import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Text,
  Avatar,
  Flex,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";
import { motion } from "framer-motion";
const List = ({ pokemons }: GetAllPokemons) => {
  const MotionTr = motion(Tr);
  const router = useRouter();
  return (
    <Table
      variant="simple"
      size="sm"
      mx="auto"
      bg={useColorModeValue("gray.100", "headerBgColor")}
    >
      <Thead textTransform="capitalize">
        <Tr>
          <Th w="1rem">#</Th>
          <Th w="1rem"></Th>
          <Th>Pokemon</Th>
          <Th>Type</Th>
          <Th>Level</Th>
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
            >
              <Td>{data.id}</Td>
              <Td>
                <Avatar
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}
                  w="2rem"
                  h="2rem"
                />
              </Td>
              <Td>
                <Text>{data.name}</Text>
              </Td>
              <Td>{data.types[0].type?.name}</Td>
              <Td>Level 1</Td>
            </MotionTr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default List;
