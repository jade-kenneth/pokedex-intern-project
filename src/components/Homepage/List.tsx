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
import React from "react";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";

const List = ({ pokemons }: GetAllPokemons) => {
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
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td whiteSpace="nowrap">
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
        <Tr h="3.25rem">
          <Td>1</Td>
          <Td>
            <Avatar w="2rem" h="2rem" />
          </Td>
          <Td>
            <Text>Pikachu</Text>
          </Td>
          <Td>Electric</Td>
          <Td>Level 3</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default List;
