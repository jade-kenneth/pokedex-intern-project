import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  CheckboxGroup,
  MenuOptionGroup,
  Stack,
  Checkbox,
  MenuItemOption,
  Image,
  Flex,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout1 from "src/components/layout/layout-1/Layout1";
import { BiFilterAlt, BiGridAlt, BiListUl } from "react-icons/bi";
import List from "src/components/Homepage/List";
import GridList from "src/components/Homepage/GridList";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { menuItems } from "src/data";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

// export const getServerSideProps: GetServerSideProps = async(context)=> {

// }

const PokedexHomePage = () => {
  const [options, setOptions] = useState<string>("grid");

  return (
    <Box width={"container.md"} mx="auto" position="relative" zIndex={998}>
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
                <CheckboxGroup
                  colorScheme="yellow"
                  defaultValue={["rock", "dark"]}
                >
                  {menuItems.map((item) => {
                    return (
                      <React.Fragment key={item}>
                        <Checkbox
                          flexDirection="row-reverse"
                          justifyContent="space-between"
                          value={item}
                          textTransform="capitalize"
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
        {options === "list" ? <List /> : <GridList />}
        <HStack justify="flex-end" mt="1rem">
          <Text fontSize="0.875rem">Showing 1-10 of 20 </Text>
        </HStack>
        <HStack spacing="1.85rem" justify="center" pb="3.688rem">
          <IconButton
            w="0.3rem"
            h="0.5rem"
            bg="transparent"
            icon={<MdKeyboardArrowLeft />}
            aria-label="prev button"
          />
          <HStack>
            <Button h="2rem" w="2rem" bg="primary">
              1
            </Button>
            <Button h="2rem" w="2rem" bg="primary">
              2
            </Button>
          </HStack>
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
