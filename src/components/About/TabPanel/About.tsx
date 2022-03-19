import {
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Stack spacing={"2rem"} mb={"5.5rem"}>
      <Text lineHeight="1.625rem">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
        mauris tempus consectetur arcu maecenas id mauris pretium. Integer
        laoreet morbi cursus consectetur. Ipsum turpis id quisque morbi est in
        id nibh sagittis. Ipsum ornare quam vitae praesent.
      </Text>

      <HStack
        justify="space-between"
        w={"16.375rem"}
        h={"6.75rem"}
        p={"1rem"}
        bg={useColorModeValue("gray.100", "secondary")}
        border="1px"
        borderColor={"gray.300"}
      >
        <VStack spacing="0.5rem" align="center" justify="center" w="100%">
          <Text color={"tertiary"}>Weight</Text>
          <Text>220.00kg</Text>
        </VStack>
        <Divider orientation="vertical" borderColor={"black.800"} />
        <VStack spacing="0.5rem" align="center" justify="center" w="100%">
          <Text color={"tertiary"}>Height</Text>
          <Text>220.00kg</Text>
        </VStack>
      </HStack>
      <Box
        w={"36.5rem"}
        h={"6.875rem"}
        bg={useColorModeValue("gray.100", "secondary")}
        border="1px"
        borderColor={"gray.300"}
        p={"1.5rem"}
      >
        <VStack align="start">
          <Text color={"tertiary"}>Breed</Text>
          <Stack direction={"row"} spacing={"2.25rem"}>
            <HStack>
              <Text>Gender:</Text>
              <Text>88.7% Male</Text>
            </HStack>
            <HStack>
              <Text>Egg Group:</Text>
              <Text>Monster</Text>
            </HStack>
            <HStack>
              <Text>Egg Cycle:</Text>
              <Text>Grass</Text>
            </HStack>
          </Stack>
        </VStack>
      </Box>
    </Stack>
  );
};

export default About;
