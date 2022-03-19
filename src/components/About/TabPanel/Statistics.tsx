import {
  Box,
  Button,
  Flex,
  HStack,
  Progress,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Statistics = () => {
  return (
    <Stack spacing={"3.25rem"} mb={"6.063rem"}>
      <VStack
        py={"1.563rem"}
        px={"2.25rem"}
        spacing={"0.5rem"}
        border="1px"
        borderColor={"gray.300"}
        bg={useColorModeValue("white", "secondary")}
      >
        <HStack h={"1.625rem"} spacing={"2.125rem"} width="100%">
          <Text w={"2.184rem"}>HP</Text>

          <Progress
            value={20}
            width="100%"
            size="xs"
            bg={useColorModeValue("gray.300", "white")}
            colorScheme="red"
          />

          <Text>00%</Text>
        </HStack>
        <HStack h={"1.625rem"} spacing={"2.125rem"} width="100%">
          <Text w={"2.184rem"}>ATK</Text>

          <Progress
            value={20}
            width="100%"
            bg={useColorModeValue("gray.300", "white")}
            size="xs"
            colorScheme="orange"
          />

          <Text>00%</Text>
        </HStack>
        <HStack h={"1.625rem"} spacing={"2.125rem"} width="100%">
          <Text w={"2.184rem"}>DEF</Text>

          <Progress
            value={20}
            width="100%"
            bg={useColorModeValue("gray.300", "white")}
            size="xs"
            colorScheme="teal"
          />

          <Text>00%</Text>
        </HStack>
        <HStack h={"1.625rem"} spacing={"2.125rem"} width="100%">
          <Text w={"2.184rem"}>SPD</Text>

          <Progress
            value={20}
            width="100%"
            bg={useColorModeValue("gray.300", "white")}
            size="xs"
            colorScheme="purple"
          />

          <Text>00%</Text>
        </HStack>
        <HStack h={"1.625rem"} spacing={"2.125rem"} width="100%">
          <Text w={"2.184rem"}>EXP</Text>

          <Progress
            value={20}
            width="100%"
            bg={useColorModeValue("gray.300", "white")}
            size="xs"
            colorScheme="gray"
          />

          <Text>00%</Text>
        </HStack>
      </VStack>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        p={"1.5rem"}
        bg={useColorModeValue("white", "secondary")}
      >
        <Text color={"tertiary"} mb={"1.5rem"}>
          Weaknesses
        </Text>
        <Flex flexWrap={"wrap"} rowGap={"1rem"} columnGap={"2rem"}>
          <HStack spacing={"1.5rem"} mr={"2rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="red"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"red"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>

          <HStack spacing={"1.5rem"} mr={"2rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="red"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"red"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
          <HStack spacing={"1.5rem"} mr={"2rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="red"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"red"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
        </Flex>
      </VStack>
      <VStack
        border="1px"
        borderColor={"gray.300"}
        align="left"
        p={"1.5rem"}
        bg={useColorModeValue("white", "secondary")}
      >
        <Text color={"tertiary"} mb={"1.5rem"}>
          Resistant
        </Text>
        <Flex flexWrap={"wrap"} rowGap={"1rem"} columnGap={"2rem"}>
          <HStack spacing={"1.5rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="green"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"green"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
          <HStack spacing={"1.5rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="green"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"green"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
          <HStack spacing={"1.5rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="green"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"green"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
          <HStack spacing={"1.5rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="green"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"green"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
          <HStack spacing={"1.5rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="green"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"green"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
          <HStack spacing={"1.5rem"}>
            <Tag
              py={"0.438rem"}
              px={"1.75rem"}
              fontSize={"0.75rem"}
              color="green"
              bg={useColorModeValue("gray.100", "white")}
            >
              Water
            </Tag>
            <HStack>
              <Text color={"green"}>160%</Text>
              <Text>damage</Text>
            </HStack>
          </HStack>
        </Flex>
      </VStack>
    </Stack>
  );
};

export default Statistics;
