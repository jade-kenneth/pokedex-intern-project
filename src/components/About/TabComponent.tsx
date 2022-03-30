import {
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  GetEachPokemon,
  GetEachPokemon_pokemonDetails,
} from "src/types/pokemon/GetEachPokemon";
import About from "./TabPanel/About";
import Evolutions from "./TabPanel/Evolutions";
import Moves from "./TabPanel/Moves";
import Statistics from "./TabPanel/Statistics";

interface TabProps {
  pokemonDetails: GetEachPokemon["pokemonDetails"];
}

const TabComponent = ({ pokemonDetails }: TabProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
      <TabList>
        <HStack mb={"3.25rem"} spacing={"1.063rem"} width="100%">
          <Tab
            bg={useColorModeValue("gray.300", "secondary")}
            _selected={{ color: "white", bg: "primary" }}
            w={"100%"}
            h={"3rem"}
            borderRadius="sm"
          >
            About
          </Tab>
          <Tab
            bg={useColorModeValue("gray.300", "secondary")}
            _selected={{ color: "white", bg: "primary" }}
            w={"100%"}
            h={"3rem"}
            borderRadius="sm"
          >
            Statistics
          </Tab>
          <Tab
            bg={useColorModeValue("gray.300", "secondary")}
            _selected={{ color: "white", bg: "primary" }}
            w={"100%"}
            h={"3rem"}
            borderRadius="sm"
          >
            Evolutions
          </Tab>
          <Tab
            bg={useColorModeValue("gray.300", "secondary")}
            _selected={{ color: "white", bg: "primary" }}
            w={"100%"}
            h={"3rem"}
            borderRadius="sm"
          >
            Moves
          </Tab>
        </HStack>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          <About />
        </TabPanel>
        <TabPanel p={0}>
          <Statistics pokemonDetails={pokemonDetails} />
        </TabPanel>
        <TabPanel p={0}>
          <Evolutions />
        </TabPanel>
        <TabPanel p={0}>
          <Moves />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabComponent;
